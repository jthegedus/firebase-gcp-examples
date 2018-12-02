import * as functions from "firebase-functions";

function message(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`from compiled JavaScript & Flow via Babel on Cloud Functions!`);
    }, 1000);
  });
}

export let babelFlow = functions.https.onRequest(async (req, res) => {
  let world = await message();
  res.status(200).send(`Hello ${world}`);
});
