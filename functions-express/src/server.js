const cors = require('cors');
const express = require('express');

const simpleServer = express();
simpleServer.get('*', (request, response) => {
  response.send('Hello from Express on Firebase!');
});

const corsServer = express();
corsServer.use(cors({origin: true}));
corsServer.get('*', (request, response) => {
  response.send('Hello from Express on Firebase with CORS!');
});

const cleanPathServer = express();
cleanPathServer.use(cors({origin: true}));
cleanPathServer.get('*', (request, response) => {
  response.send(
    'Hello from Express on Firebase with CORS! No trailing \'/\' required!'
  );
});

module.exports = {
  simpleServer,
  corsServer,
  cleanPathServer
};
