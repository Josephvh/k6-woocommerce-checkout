import { sleep, group, check, fail } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween, findBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export function updateAddress() {
  group("Submit Checkout (Store API)", function () {
    const url = `${globalThis.vars.websiteUrl}/wp-json/wc/store/v1/checkout?_locale=site`;

    const payload = JSON.stringify({
      billing_address: globalThis.vars.customer_details,
      create_account: false,
      shipping_address: globalThis.vars.customer_details,
      payment_method: "cod",
    });

    const response = http.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, */*;q=0.1",
        "X-WP-Nonce": globalThis.vars.wpNonce,
        "Nonce": globalThis.vars.nonce,
        Origin: globalThis.vars.websiteUrl,
        Referer: globalThis.vars.websiteCheckoutUrl,
      },
    });

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true,
    });

    let result;

    try {
      result = jsonpath.query(
        response.json(),
        "$['result']"
      )[0];
    } catch (err) {
      // not JSON most likely, so print the response (if there was a response.body):
      if (response.body) {
        console.log(response.body);
      }
      fail(err); // ends the iteration
    }

    const resultEntry = response.json().payment_result.payment_details.find(
      (item) => item.key === "result"
    );
    const checkout_result = resultEntry ? resultEntry.value : undefined;

    console.debug("Checkout result:", checkout_result);

    check(checkout_result, {
      'checkout completed successfully': (r) => r === 'success',
    });

    globalThis.vars["redirectUrl"] = jsonpath.query(
      response.json(),
      "$.payment_result.payment_details[?(@.key=='redirect')].value"
    )[0];

    if (!globalThis.vars["redirectUrl"]) {
      fail(`Checkout failed: no redirect URL in response:\n${response.body}`);
    }

    console.debug("Checkout redirect URL: " + globalThis.vars["redirectUrl"]);

    // the order ID is in the redirectUrl
    globalThis.vars["orderId"] = findBetween(globalThis.vars["redirectUrl"], 'order-received/', '/');
    globalThis.vars["key"] = globalThis.vars["redirectUrl"].substring(globalThis.vars["redirectUrl"].indexOf('key=') + 4);

    console.debug("orderId: " + globalThis.vars["orderId"]);
    console.debug("key: " + globalThis.vars["key"]);

    if (globalThis.vars["orderId"].length > 0) {
      console.debug("Successfully placed order! ID: " + globalThis.vars["orderId"]);
    } else {
      if (response.body) {
        fail("Failed to place order: " + response.body);
      } else {
        fail("Failed to place order (no response.body).");
      }
    }

  });

  // sleep(randomIntBetween(pauseMin, pauseMax));
}