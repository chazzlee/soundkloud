import { getRandomInteger } from "./getRandomInteger";

export function getRandomRGB() {
  let red = getRandomInteger();
  let green = getRandomInteger();
  let blue = getRandomInteger();

  return `rgb(${red}, ${green}, ${blue})`;
}
