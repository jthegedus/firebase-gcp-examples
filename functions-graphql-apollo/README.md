<div align="center">

# Apollo GraphQL & Cloud Functions for Firebase

Cloud Functions can accept an Express.js server as it's params as they share a similar request/response object ([as discussed here][express-example]). Using the [`apollo-server-express`][apollo-express] package we can quickly and easily setup a GraphQL server on FaaS.

The accompanying [Medium post][medium-graphql].

</div>

[express-example]: https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-express
[apollo-express]: https://github.com/apollographql/apollo-server
[medium-graphql]: https://medium.com/@jthegedus/graphql-on-cloud-functions-for-firebase-153fe7b02ea5

## Install & Run

```shell
# Install
yarn
# Locally serve
yarn serve
# Deploy
yarn deploy
```

## Routes

GraphQL Playground: `https://us-central1-<project-id>.cloudfunctions.net/api`

GraphQL Endpoint: `https://us-central1-<project-id>.cloudfunctions.net/api/graphql`

## Use

Go to the GraphQL Playground route and enter the GraphQL endpoint route into the GraphQL Server address bar to connect the playground to your endpoint. Now you can query away and develop your app!

Here's the test query:

```graphql
{
  hello
}
```
