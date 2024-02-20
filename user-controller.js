import seedrandom from "seedrandom";
import { generateUsers } from "./user-generation.js";
import { en, pl, ru } from "@faker-js/faker";
import { corruptData } from "./user-corrupter.js";
export let rng;
class UserController {
  async updateData(req, res, next) {
    const { seed, amount, mistakes, locale, page } = req.body;
    let currentLocale;
    if (locale === "ru") currentLocale = ru;
    if (locale === "pl") currentLocale = pl;
    if (locale === "en") currentLocale = en;
    rng = seedrandom(seed + page);
    let newArr = [];
    let userArr = generateUsers(seed, amount, currentLocale, page);
    for (let i = 0; i < userArr.length; i++) {
      newArr.push(corruptData(userArr[i], mistakes, i, currentLocale));
    }
    return res.json(newArr);
  }
}
export default new UserController();
