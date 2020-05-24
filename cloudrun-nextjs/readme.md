# Next.js SSG|SSR on Firebase with Firebase Hosting & Google Cloud Run

> This is an expansion of the [`functions-nextjs` example](../functions-nextjs) so you should read it's README first as I will only cover differences here and not Next.js specifics of SSR/SSG.

Host a Next.js app on Firebase using Firebase Hosting and Google Cloud Run rewrite rules.

## Contents

- [Setup Firebase, Google Cloud and Next.js](#setup-firebase-google-cloud-and-nextjs)
- [Install and Run](#install-and-run)
- [Improvements over Cloud Functions example](#improvements-over-cloud-functions-example)
- [Caveats](#caveats)
- [Future](#future)

## Setup Firebase, Google Cloud and Nextjs

- `gcloud auth login`
- `firebase login`
- `firebase init` **or** select an existing project with `firebase use --add`
  - create a new Web App within the project to host your site. [See instructions here](https://firebase.google.com/docs/hosting/multisites).
- update `firebase.json` with your new Apps hosting target
  - replace the `hosting.site` `TODO_YOUR_WEB_APP_DEPLOY_TARGET_HERE` with your web apps value.
- populate Firestore with test data:
  - create a collection called `posts`
  - create documents with auto-generated IDs and the following fields:
    - field: `title`. Value: `A title`
    - field: `blurb`. Value: `A blurb`
    - field: `content`. Value: `<p>Some HTML <em>content</em></p>`
- replace `TODO_YOUR_PROJECT_ID_HERE` in `next.config.js` with your project's ID
- enable Google Cloud Run
- enable Google Cloud Build
- update your Firebase project to Blaze plan

## Install and Run:

```shell
# development
npm install
npm run dev
# or
yarn
yarn dev

# build docker image, deploy to cloud run, deploy public assets to firebase
npm run deploy
```

After deploying, you can continue to add Posts to your Firestore collection and the app will render them without needing to redeploy!

## Improvements over Cloud Functions example

- no custom [Next.js server](https://nextjs.org/docs/advanced-features/custom-server)
  - this caused much confusion as Next.js directs people to run development mode with the custom server, but I discouraged this as it was intended as a simple wrapper for Cloud Functions usage and not for dev mode.
  - `next start` was not able to be used which is required for some Next.js features and excluded them from use (serverless mode).
- no need to copy the `.next/` directory after build into the `functions` directory to be uploaded to the Cloud Functions environment. This was confusing and is explicit and clear with Docker.
- simplified folder structure
- simplified build and deploy scripts in `package.json`
- no issues with duplicate static file serving (images/css)
- easier to add Firebase Functions to the project as the `functions` folder will be ignored:
  ```
  ┌ components/
  | └ ...
  ├ functions/          <-- All other backend functions
  | ├ firebase.json     <-- Contains only Functions config.
  | ├ package.json
  | ├ tsconfig.json
  | ├ src/
  | | └ index.ts        <-- main source file for your Cloud Functions
  | └ lib/                  Cloud Function prefixing to avoid clashes
  |   ├ index.js        <-- compiled JavaScript code
  |   └ index.js.map    <-- source map for debugging
  ├ helpers/
  | └ ...
  ├ pages/
  | └ ...
  ├ public/
  | └ ...
  ├ .dockerignore       <-- Ignore all dirs except those required for Cloud Run Next.js app
  ├ .gitignore
  ├ .tool-versions      <-- move this here. See https://asdf-vm.com
  ├ Dockerfile          <-- Cloud Run Next.js Image
  ├ firebase.json       <-- Contains Hosting with Deploy Targets
  ├ firestore.rules
  ├ next.config.js
  ├ package-lock.json
  └ package.json
  ```

## Caveats

- Deployment is more involved with Cloud Run not being integrated into the `firebase deploy` workflow.
  - requires `gcloud`
  - takes more time since Cloud Functions do not perform an `npm install` whereas we must do so with Cloud Run
- Since `next build` occurs in the Cloud Run build on Google Cloud Build, we don't have the [Next.js Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization) files to bubble up and push to Firebase Hosting. This is a small optimization.
