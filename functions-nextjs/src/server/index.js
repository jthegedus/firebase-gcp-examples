import * as functions from "firebase-functions";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, conf: { distDir: "dist/client" } });
const handle = nextApp.getRequestHandler();

const server = functions.https.onRequest((request, response) => {
  console.log("File: " + request.originalUrl);
  console.log("dev:", dev);
  // log the page.js file or resource being requested

  // if the url contains _next, then return old nextApp.prepare() impl
  // else, return the serverless redirect

  const page = request.originalUrl === "/" ? "index" : request.originalUrl;
  console.info("page", page);
  return require(`../client/serverless/pages/${page}`).render(
    request,
    response
  );
  // return nextApp.prepare().then(() => handle(request, response));
});

const nextjs = {
  server,
};

export { nextjs };
