import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function refreshCart() {
  let response;

  group("Submit Checkout", function () {
    response = http.get(
      globalThis.vars["redirectUrl"],
      {
        tags: {
          name: `${globalThis.vars.websiteUrl}/checkout/order-received/`
        },
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          host: globalThis.vars.hostName,
          "upgrade-insecure-requests": "1",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true,
      dynamicIds: [
        globalThis.vars["orderId"],
        globalThis.vars["key"]
      ]
    });

    response = http.post(
      `${globalThis.vars.websiteUrl}/?wc-ajax=get_refreshed_fragments`,
      {
        time: "1613672584353",
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

  // sleep(randomIntBetween(pauseMin, pauseMax));
}