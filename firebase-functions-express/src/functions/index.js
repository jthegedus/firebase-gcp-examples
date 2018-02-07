const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");

// Express
// requires trailing slash
const app1 = express();
app1.get("*", (request, response) => {
  response.send("Hello from Express on Firebase!");
});

const api1 = functions.https.onRequest(app1);

// Express with CORS
// requires trailing slash
const app2 = express();
app2.use(cors({ origin: true }));
app2.get("*", (request, response) => {
  response.send("Hello from Express on Firebase with CORS!");
});

const api2 = functions.https.onRequest(app2);

// Express with CORS & automatic trailing '/' solution
const app3 = express();
app3.use(cors({ origin: true }));
app3.get("*", (request, response) => {
  response.send(
    "Hello from Express on Firebase with CORS! No trailing '/' required!"
  );
});

// code is not as clean, but a better endpoint to consume
const api3 = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // prepend '/' to keep query params if any
  }
  return app3(request, response);
});

module.exports = {
  api1,
  api2,
  api3,
};
