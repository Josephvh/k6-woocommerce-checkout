import { navigateHomepage } from "./navigateHomepage.js";
import { navigateShop } from "./navigateShop.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { submitCheckout } from "./submitCheckout.js";

export const options = {
};

// used to store global variables
const hostName = `${__ENV.HOSTNAME}`
globalThis.vars = {
  hostName,
  websiteUrl: `http://${hostName}`,
  websiteShopUrl: `http://${hostName}/shop/`,
  websiteShopCategoryUrl: `http://${hostName}/product-category/goats/`,
  websiteCartUrl: `http://${hostName}/cart/`,
  websiteCheckoutUrl: `http://${hostName}/checkout/`,
};

// global min/max sleep durations (in seconds):
globalThis.pauseMin = 5;
globalThis.pauseMax = 15;

export default function main() {
  navigateHomepage();
  navigateShop();
  addToCart();
  navigateToCart();
  navigateToCheckout();
  updateAddress();
  submitCheckout();
}