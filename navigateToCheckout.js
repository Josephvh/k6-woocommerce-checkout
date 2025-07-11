import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function navigateToCheckout() {
  group("Navigate to Checkout", function () {
    const response = http.get(globalThis.vars.websiteCheckoutUrl, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate",
        "accept-language": "en-US,en;q=0.9",
        connection: "keep-alive",
        host: globalThis.vars.hostName,
        "upgrade-insecure-requests": "1",
      },
    });

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });

    const nonceMatch = response.body.match(/storeApiNonce:\s*'([a-zA-Z0-9]+)'/);
    if (nonceMatch && nonceMatch[1]) {
      globalThis.vars.nonce = nonceMatch[1];
    }

    const wpNonceMatch = response.body.match(/wp\.apiFetch\.nonceMiddleware\s*=\s*wp\.apiFetch\.createNonceMiddleware\(\s*["']([a-f0-9]+)["']\s*\)/i);
    if (wpNonceMatch && wpNonceMatch[1]) {
      globalThis.vars.wpNonce = wpNonceMatch[1];
    }

    console.debug("wp-nonce token: " + globalThis.vars["wpNonce"]);
    console.debug("storeApiNonce token: " + globalThis.vars["nonce"]);
  });

  // sleep(randomIntBetween(pauseMin, pauseMax));
}