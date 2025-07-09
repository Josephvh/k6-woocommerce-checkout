import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function updateAddress() {
  group("Update Address", function () {
    let response = http.post(
      `${globalThis.vars.websiteUrl}/?wc-ajax=update_order_review`,
      {
        security: globalThis.vars["securityToken"],
        // payment_method: "cod",
        // country: "US",
        // state: "CO",
        // postcode: "",
        // city: "",
        // address: "",
        // address_2: "",
        // s_country: "US",
        // s_state: "CO",
        // s_postcode: "",
        // s_city: "",
        // s_address: "",
        // s_address_2: "",
        // has_full_address: "false",
        // post_data:
        //   "billing_first_name=&billing_last_name=&billing_company=&billing_country=US&billing_address_1=&billing_address_2=&billing_city=&billing_state=CO&billing_postcode=&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=" + globalThis.vars["checkoutToken"] + "&_wp_http_referer=%2Fcheckout%2F",
        post_data:
          "billing_first_name=Joseph&billing_last_name=Van&billing_email=joseph.van@example.com&billing_address_1=Bellville&billing_city=Cape%20Town&billing_postcode=7530&billing_country=ZA&billing_state=WC&payment_method=cod&woocommerce-process-checkout-nonce=" + globalThis.vars["checkoutToken"] + "&_wp_http_referer=%2Fcheckout%2F",
      },
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: globalThis.vars.hostName,
          origin: globalThis.vars.websiteUrl,
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });

    response = http.post(
      `${globalThis.vars.websiteUrl}/?wc-ajax=update_order_review`,
      {
        security: globalThis.vars["securityToken"],
        // payment_method: "cod",
        // country: "US",
        // state: "CO",
        // postcode: "80443",
        // city: "Frisco",
        // address: "Street Address 1",
        // address_2: "",
        // s_country: "US",
        // s_state: "CO",
        // s_postcode: "80443",
        // s_city: "Frisco",
        // s_address: "Street Address 1",
        // s_address_2: "",
        // has_full_address: "true",
      //   post_data:
      //     "billing_first_name=Tom&billing_last_name=Test&billing_company=&billing_country=US&billing_address_1=Street%20Address%201&billing_address_2=&billing_city=Frisco&billing_state=CO&billing_postcode=80443&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=" + globalThis.vars["checkoutToken"] + "&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review",
        post_data:
          "billing_first_name=Joseph&billing_last_name=Van&billing_company=&billing_country=ZA&billing_address_1=Bellville&billing_address_2=&billing_city=Cape%20Town&billing_state=WC&billing_postcode=7530&billing_phone=&billing_email=joseph.van%40example.com&order_comments=&payment_method=cod&shipping_first_name=Joseph&shipping_last_name=Van&shipping_company=&shipping_country=ZA&shipping_address_1=Bellville&shipping_address_2=&shipping_city=Cape%20Town&shipping_state=WC&shipping_postcode=7530&shipping_phone=&woocommerce-process-checkout-nonce=" + globalThis.vars["checkoutToken"] + "&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review",
      },
      {
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: globalThis.vars.hostName,
          origin: globalThis.vars.websiteUrl,
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });
  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}