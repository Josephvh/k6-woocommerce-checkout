import { navigateHomepage } from "./navigateHomepage.js";
import { navigateShop } from "./navigateShop.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { refreshCart } from "./refreshCart.js";

export const options = {
};

function generateSyllable() {
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";
  return (
    consonants[Math.floor(Math.random() * consonants.length)] +
    vowels[Math.floor(Math.random() * vowels.length)]
  );
}

function randomName(syllables = 2) {
  let name = "";
  for (let i = 0; i < syllables; i++) {
    name += generateSyllable();
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const random_name = randomName();
const last_name = "Doe";

// used to store global variables
const hostName = `${__ENV.HOSTNAME}`
globalThis.vars = {
  hostName,
  websiteUrl: `http://${hostName}`,
  websiteShopUrl: `http://${hostName}/shop/`,
  websiteShopCategoryUrl: `http://${hostName}/product-category/goats/`,
  websiteCartUrl: `http://${hostName}/cart/`,
  websiteCheckoutUrl: `http://${hostName}/checkout/`,
  customer_details: {
    first_name: random_name,
    last_name: last_name,
    company: "",
    address_1: "Bellville",
    address_2: "",
    city: "Cape Town",
    state: "WC",
    postcode: "7530",
    country: "ZA",
    email: `${random_name}_${last_name}@example.com`,
    phone: "",
  },
};

// global min/max sleep durations (in seconds):
// globalThis.pauseMin = 5;
// globalThis.pauseMax = 15;

export default function main() {
  navigateHomepage();
  navigateShop();
  addToCart();
  navigateToCart();
  navigateToCheckout();
  updateAddress();
  refreshCart();
}