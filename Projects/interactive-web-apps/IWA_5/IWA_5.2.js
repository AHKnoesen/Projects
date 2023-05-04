const FREE_WARNING = 'Free shipping only applies to single customer orders';
const BANNED_WARNING = 'Unfortunately we do not ship to your country of residence';
const NONE_SELECTED = 0;

let shipping;
let currency;
const location = 'RSA'; // Change to the user's location
const customers = 1;

const shoes = 300 * 1;
const toys = 100 * 5;
const shirts = 150 * NONE_SELECTED;
const batteries = 35 * 2;
const pens = 5 * NONE_SELECTED;

if (location === 'RSA') {
  shipping = 400;
  currency = 'R';
} else if (location === 'NAM') {
  shipping = 600;
  currency = '$';
} else {
  shipping = 800;
  currency = '$';
}

if ((shoes + batteries + pens + shirts) >= 1000 && customers === 1) {
  if (location === 'RSA' || location === 'NAM') {
    shipping = 0;
  }
}

if (shipping === 0 && customers !== 1) {
  console.log(FREE_WARNING);
} else if (location === 'NK') {
  console.log(BANNED_WARNING);
} else {
  console.log('Price:', currency, shoes + batteries + pens + shirts + shipping);
}
