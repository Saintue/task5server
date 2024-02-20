import seedrandom from "seedrandom";
import { addChars, deleteRandChar, swapChars } from "./mistakes-emulation.js";
import { rng } from "./user-controller.js";
let corrupt;
let objSeed;

export function corruptData(obj, mistakes, i, locale) {
  if (mistakes === 0) return obj;
  let mistakeChance = (mistakes % 1).toFixed(2) * 100;
  let chanceSeed = seedrandom(rng() + i);
  if (chanceSeed().toFixed(2) * 100 <= mistakeChance) {
    mistakes = Math.ceil(mistakes);
  } else {
    mistakes = Math.floor(mistakes);
  }
  let n = 0;
  while (n < mistakes) {
    let objFieldToMod = "";
    corrupt = seedrandom(rng() + n);
    objSeed = seedrandom(rng() + n * 7564);
    let corruptChoice = corrupt() * 10;
    let objectChoice = corrupt() * 10;
    if (Math.floor(corruptChoice) === 0 || Math.floor(objectChoice) === 0) {
      let k = 1;
      while (
        Math.floor(corruptChoice) === 0 ||
        Math.floor(objectChoice) === 0
      ) {
        corrupt = seedrandom(rng() + k);
        objSeed = seedrandom(rng() + k * 95);
        corruptChoice = corrupt() * 10;
        objectChoice = objSeed() * 10;
        k++;
      }
    }
    if ((corruptChoice % 1).toFixed(2) < 0.5) {
      corruptChoice = Math.floor(corruptChoice);
    } else {
      corruptChoice = Math.ceil(corruptChoice);
      if (corruptChoice === 10) corruptChoice = corruptChoice - 1;
    }
    if ((objectChoice % 1).toFixed(2) < 0.5) {
      objectChoice = Math.floor(objectChoice);
    } else {
      objectChoice = Math.ceil(objectChoice);
      if (objectChoice === 10) objectChoice = objectChoice - 1;
    }

    if (objectChoice <= 3) {
      objFieldToMod = "name";
    }
    if (objectChoice >= 4 && objectChoice <= 6) {
      objFieldToMod = "adres";
    }
    if (objectChoice >= 7 && objectChoice <= 9) {
      objFieldToMod = "phone";
    }
    if (corruptChoice <= 3) {
      obj[objFieldToMod] = deleteRandChar(obj[objFieldToMod], n);
    }
    if (corruptChoice >= 4 && corruptChoice <= 6) {
      obj[objFieldToMod] = addChars(obj[objFieldToMod], n, locale);
    }
    if (corruptChoice >= 7 && corruptChoice <= 9) {
      obj[objFieldToMod] = swapChars(obj[objFieldToMod], n);
    }
    n++;
  }
  return obj;
}
