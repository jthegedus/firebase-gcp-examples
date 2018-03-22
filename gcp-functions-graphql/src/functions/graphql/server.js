import bodyParser from "body-parser";
import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./data/schema";
import { printSchema } from "graphql/utilities/schemaPrinter";

function setupGraphQLServer() {
  const graphQLServer = express();

  // /api/graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  );

  // /api/graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress({ endpointURL: "/api/graphql" })
  );

  // /api/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(printSchema(schema));
  });

  return graphQLServer;
}

export default setupGraphQLServer;
