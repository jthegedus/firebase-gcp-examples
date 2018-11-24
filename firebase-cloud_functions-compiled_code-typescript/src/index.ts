import * as functions from "firebase-functions";

const message = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`from compiled TypeScript via TSC on Cloud Functions!`);
    }, 1000);
  });
};

export let helloFromTypeScript = functions.https.onRequest(async (req, res) => {
  let world = await message();
  res.status(200).send(`Hello ${world}`);
});
