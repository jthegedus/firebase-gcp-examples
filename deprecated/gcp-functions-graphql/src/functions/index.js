import setupGraphQLServer from "./graphql/server";

// GraphQL Server on Google Cloud Functions with Apollo-Express-Server
const gqlServer = setupGraphQLServer();

// https://us-central1-<project-name>.cloudfunctions.net/api
export const api = (req, res) => {
  console.log("File: " + req.originalUrl);
  gqlServer(req, res);
};
