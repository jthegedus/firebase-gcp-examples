const functions = require('firebase-functions');

exports.englishSyntax = functions.pubsub
  .schedule('every 10 minutes')
  .timeZone('Australia/NSW')
  .onRun(context => {
    console.log('triggered every 10 minutes', context);
  });

exports.cronSyntax = functions.pubsub
  .schedule('5 * * * *')
  .timeZone('Pacific/Auckland')
  .onRun(context => {
    console.log('triggered every 5 minutes', context);
  });
