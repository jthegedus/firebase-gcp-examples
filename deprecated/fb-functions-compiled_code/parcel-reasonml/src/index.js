import * as functions from "firebase-functions";
import { reasonMessage } from "./Main.re";

function message() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(reasonMessage());
    }, 1000);
  });
}

export let parcelReasonML = functions.https.onRequest(async (req, res) => {
  let world = await message();
  res.status(200).send(`Hello ${world}`);
});
