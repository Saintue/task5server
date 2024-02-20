import seedrandom from "seedrandom";
import { en, pl, ru } from "@faker-js/faker";
import { rng } from "./user-controller.js";
const polandAlphabet =
  "AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż";
const ruAlphabet =
  "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя";
const enAlphabet = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

export function deleteRandChar(field, n) {
  if (field.length < 3) return field;
  const fLength = field.length;
  let deletionSeed = seedrandom(rng() + n * 47);
  let deletionIndex = deletionSeed() * fLength;
  if ((deletionIndex % 1).toFixed(2) < 0.5) {
    deletionIndex = Math.floor(deletionIndex);
  } else {
    deletionIndex = Math.ceil(deletionIndex);
    if (deletionIndex === fLength) deletionIndex = deletionIndex - 1;
  }
  return (
    field.substring(0, deletionIndex) +
    field.substring(deletionIndex + 1, fLength)
  );
}

export function addChars(field, n, locale) {
  if (field.length > 30) return field;
  let currentLocale = "";
  if (locale === ru) currentLocale = ruAlphabet;
  if (locale === en) currentLocale = enAlphabet;
  if (locale === pl) currentLocale = polandAlphabet;
  let addSeed = seedrandom(rng() + n * 81);
  let addIndex = addSeed() * field.length;
  let charSeed = seedrandom(rng() + n * 831);
  let charToAdd = charSeed() * currentLocale.length;
  if ((addIndex % 1).toFixed(2) < 0.5) {
    addIndex = Math.floor(addIndex);
  } else {
    addIndex = Math.ceil(addIndex);
    if (addIndex === currentLocale.length) addIndex = addIndex - 1;
  }
  if ((charToAdd % 1).toFixed(2) < 0.5) {
    charToAdd = Math.floor(charToAdd);
  } else {
    charToAdd = Math.ceil(charToAdd);
    if (charToAdd === currentLocale.length) charToAdd = charToAdd - 1;
  }
  return (
    field.substring(0, addIndex) +
    currentLocale.charAt(charToAdd) +
    field.substring(addIndex, field.length)
  );
}

export function swapChars(field, n) {
  let swapSeed = seedrandom(rng() + n * 27);
  let swapIndex = swapSeed() * field.length;
  if ((swapIndex % 1).toFixed(2) < 0.5) {
    swapIndex = Math.floor(swapIndex);
  } else {
    swapIndex = Math.ceil(swapIndex);
    if (swapIndex === field.length) swapIndex = swapIndex - 1;
  }
  if (swapIndex === 0)
    return field.charAt(1) + field.charAt(0) + field.substring(2, field.length);
  if (swapIndex === field.length - 1)
    return (
      field.substring(0, swapIndex - 1) +
      field.charAt(swapIndex) +
      field.charAt(swapIndex - 1)
    );
  return (
    field.substring(0, swapIndex - 1) +
    field.charAt(swapIndex) +
    field.charAt(swapIndex - 1) +
    field.substring(swapIndex + 1, field.length)
  );
}
