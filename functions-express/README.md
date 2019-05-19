<div align="center">

# Express.js & Cloud Functions for Firebase

</div>

HTTP Cloud Functions share slightly modified `request`/`response` objects to the popular Node.js server package, Express.js. This allows us to pass through an existing Express app to the Cloud Function and have it pass the compatible req/res objects to our server.

This allows for familiar API development with the use of existing middleware and authentication models.

The accompanying [Medium post][medium-express].

[medium-express]: https://medium.com/@jthegedus/express-js-on-cloud-functions-for-firebase-f76b5506179

## Install & Run

```shell
# Install
yarn
# Locally serve
yarn serve
# Deploy
yarn deploy
```
