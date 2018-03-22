# GraphQL Server on Google Cloud Functions

Host a GraphQL Server on Google Cloud Functions by routing requests through the [apollo-sever-express](https://github.com/apollographql/apollo-server/tree/master/packages/graphql-server-express) package.

This method is markedly simpler than any other GraphQL-on-FaaS method I have seen. No [custom packages for GCP](https://github.com/nicolasdao/google-graphql-functions) or struggling with API Gateway or complex setup instructions for [AWS](https://github.com/apollographql/graphql-server/tree/master/packages/graphql-server-lambda).

[Babel](https://babeljs.io/) is used to compile to the target runtime, for more information on this setup read [Babel & preset-env](https://codeburst.io/babel-preset-env-cbc0bbf06b8f) & [ES6+ in Cloud Functions for Firebase #2](https://codeburst.io/es6-in-cloud-functions-for-firebase-2-415d15205468)

### Routes

| Endpoint | Route                                                                       |
| :------- | :-------------------------------------------------------------------------- |
| Schema   | `https://us-central1-<project-name>.cloudfunctions.net/api/schema`          |
| GraphiQL | `https://us-central1-<project-name>.cloudfunctions.net/api/graphiql`        |
| GraphQL  | `https://us-central1-<project-name>.cloudfunctions.net/api/graphql?<query>` |

## Setup the Cloud SDK

* Install the "Cloud SDK" (gcp cli tool) following your systems instrucitons - https://cloud.google.com/sdk/downloads
* Initialize the Cloud SDK - https://cloud.google.com/sdk/docs/initializing
  ```shell
  gcloud init
  ```

You should be prompt by the Cloud SDK to select your GCP project at this step.

## Download & Install

```shell
curl https://codeload.github.com/jthegedus/blog-examples/tar.gz/master | tar -xz --strip=1 blog-examples-master/gcp-functions-graphql
cd gcp-functions-graphql
# Install
yarn
```

## Local Testing

```shell
# TODO
```

## Deploy to Google Cloud Functions

```shell
yarn deploy
```
