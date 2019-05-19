const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Express Servers
const {simpleServer, corsServer, cleanPathServer} = require('./server');

// HTTP Cloud Functions
const simple = functions.https.onRequest(simpleServer);
const cors = functions.https.onRequest(corsServer);
const cleanPath = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return cleanPathServer(request, response);
});

module.exports = {
  simple,
  cors,
  cleanPath
};

