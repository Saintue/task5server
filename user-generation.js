import { en, Faker, pl, ru } from "@faker-js/faker";
import seedrandom from "seedrandom";
import { rng } from "./user-controller.js";

export function generateUsers(seed, amount, locale, page) {
  let faker = new Faker({
    locale: locale,
  });
  if (locale !== pl) {
    faker.seed(seed + page);
    const userArr = [];
    for (let i = 0; i < amount; i++) {
      let adresSeed = seedrandom(rng() + seed + page);
      let adres = "";
      if ((adresSeed() % 1).toFixed(2) < 0.5) {
        if (locale === en) {
          adres = `${faker.location.city() + " " + faker.location.street() + " " + faker.location.buildingNumber()}`;
        }
        if (locale === ru) {
          adres = `${faker.location.city() + " " + faker.location.street() + " " + faker.location.buildingNumber()}`;
        }
      } else {
        if (locale === en) {
          adres = `${faker.location.county() + " " + faker.location.city() + " " + faker.location.street() + " " + faker.location.buildingNumber()}`;
        }
        if (locale === ru) {
          adres = `${faker.location.city() + " " + faker.location.street()}`;
        }
      }
      const id = faker.database.mongodbObjectId();
      const fullName = faker.person.fullName();
      const phone = faker.phone.imei();
      if (locale === ru) {
        const userObj = {
          id: id,
          name: `${fullName}`,
          adres: adres,
          phone: `+7${phone.substring(9, phone.length)}`,
        };
        userArr.push(userObj);
      }
      if (locale === en) {
        const userObj = {
          id: id,
          name: `${fullName}`,
          adres: adres,
          phone: `+1${phone.substring(9, phone.length)}`,
        };
        userArr.push(userObj);
      }
    }
    return userArr;
  } else {
    faker.seed(seed + page);
    const userArr = [];
    for (let i = 0; i < amount; i++) {
      let adresSeed = seedrandom(rng() + seed + page);
      let adres = "";
      if ((adresSeed() % 1).toFixed(2) < 0.5) {
        adres = `${faker.location.city() + " " + faker.location.street() + " " + faker.location.buildingNumber()}`;
      } else {
        adres = `${faker.location.zipCode() + " " + faker.location.city() + " " + faker.location.street() + " " + faker.location.buildingNumber()}`;
      }
      const id = faker.database.mongodbObjectId();
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const phone = faker.phone.imei();
      const userObj = {
        id: id,
        name: `${firstName + " " + lastName}`,
        adres: adres,
        phone: `+48${phone.substring(9, phone.length)}`,
      };
      userArr.push(userObj);
    }
    return userArr;
  }
}
