import * as functions from "firebase-functions";

function message(): Promise<String> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`from compiled TypeScript via ParcelJS on Cloud Functions!`);
    }, 1000);
  });
}

export let helloFromTypeScriptParcelJS = functions.https.onRequest(
  async (_req, res) => {
    let world = await message();
    res.status(200).send(`Hello ${world}`);
  }
);
