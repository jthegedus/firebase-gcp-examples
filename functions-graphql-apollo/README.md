<div align="center">

# Apollo GraphQL & Cloud Functions for Firebase

Cloud Functions can accept an Express.js server as it's params as they share a similar request/response object ([as discussed here][express-example]). Using the [`apollo-server-express`][apollo-express] package we can quickly and easily setup a GraphQL server on FaaS.

The accompanying [Medium post][medium-graphql] **is yet to be written**. Here is the [older version][medium-old-graphql] for now.

</div>

[express-example]: https://github.com/jthegedus/firebase-gcp-examples/tree/master/functions-express
[apollo-express]: https://github.com/apollographql/apollo-server
[medium-graphql]: https://medium.com/@jthegedus/table-of-contents-ec337953b39b
[medium-old-graphql]: https://medium.com/@jthegedus/graphql-server-on-cloud-functions-for-firebase-ae97441399c0

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
