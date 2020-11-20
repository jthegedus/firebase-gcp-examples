# Next.js SSG|SSR on Firebase with Firebase Hosting & Cloud Functions

Host a Next.js app on Firebase using Firebase Hosting and Cloud Function rewrite rules.

Using [Firebase Hosting priority order](https://firebase.google.com/docs/hosting/full-config#hosting_priority_order) we will serve all static content from the Firebase CDN and then any request misses will be fulfilled by the Cloud Functions hosted Next.js app via [Firebase Hosting rewrites](https://firebase.google.com/docs/hosting/full-config#rewrites).

## Contents

- [Nextjs Page Types](#nextjs-page-types)
- [Need to Know](#need-to-know)
- [Setup Firebase and Next.js](#setup-firebase-and-nextjs)
- [Install and Run](#install-and-run)
- [TypeScript](#typescript)
- [Improvements over previous examples](#improvements-over-previous-examples)
- [Caveats](#caveats)
- [Future](#future)

## Nextjs Page Types

With the [release of Next.js 9.3+](https://nextjs.org/blog/next-9-3) new APIs allow for a variety of different page types depending on use case and combination.

- static pages
- SSG pages
- SSG (Static Site Generation) `fallback:false` pages
- iSSG (Static Site Generation) `fallback:true` pages
- SSR (Server-Side Rendered) pages

The Hosting requirements for these are as follows:

- SSG: completely static
- SSG `fallback:false`: completely static
- iSSG `fallback:true`: requires backend compute
- SSR: requires backend compute

### Static Pages

- `/pages/index.js`: A homepage which performs a client-side query to an API for some data.
- `/pages/about.js`: About page.
- `/pages/blog/not-a-post.js`: A page under `blog/` to show the mix of static files with dynamic routes.

### SSR Pages

Using `getServerSideProps()`.

- `/pages/blog/index.js`: A blog list page rendered per request with data fetching every request.

### SSG Pages

Using `getStaticProps()` and `getStaticPaths()` with `fallback: true`.

- `/pages/blog/[post].js`: Individual blog posts rendered on **first** request to the URL, then cached indefinitely (until next deployment). Data is fetched from Firestore database.

With `fallback:true`, these pages are generated at build-time from the list of paths from `getStaticPaths()`. Any pages **not** rendered at build time will be rendered on first request. By intentionally not producing paths in `getStaticPaths()` we get no build-time pages and only pages built on first request.

If `fallback: false` was used, pages would only be generated at build-time and a `404` would be served for none pre-rendered pages.

SSG pages have Cache-Controls set with:

```
'Cache-Control',s-maxage=31536000, stale-while-revalidate
```

These pages are CDN cached and served if they exist from the CDN, then `stale-while-revalidate` sends a request to our Next.js server on our Cloud Function to refresh the generated page contents. This is not ideal as it means each request will hit our Cloud Function like SSR. iSSG is not a cost optimisation, but an experience optimisation.

## Need to Know

- [Firebase Hosting priority order](https://firebase.google.com/docs/hosting/full-config#hosting_priority_order)
- `firebase.json` contains the rewrite rule to catch all CDN misses and call our Next.js Cloud Function
- specifying `"engines": { "node: "10" }` in `package.json` is required to indicate to Firebase to the version of node for the Cloud Function
- `firebase-tools` version `8.x.x` or higher should be used as it will set the Cloud Function's IAM permission to be callable without authentication.
- [Firebase Cloud Function Groups](https://firebase.google.com/docs/functions/organize-functions#group_functions) are used to isolate the Next.js server function from the rest in your project. This allows you to deploy just the Next.js app without redeploying all other Cloud Functions. It also avoids Cloud Function name clashes.
- [Firebase Deploy Targets](https://firebase.google.com/docs/cli/targets#set-up-deploy-target-hosting) are used to isolate the Next.js app from the rest of your Firebase project. Since Firebase allows multiple websites, databases etc per project, we want to be explicit about which app we're deploying in our project.

## Setup Firebase and Nextjs

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

## Install and Run:

```shell
# development
npm install
npm run dev
# or
yarn
yarn dev

# deploy production to Firebase
npm run deploy
```

After deploying, you can continue to add Posts to your Firestore collection and the app will render them without needing to redeploy!

## TypeScript

To use Typescript, simply follow [Typescript setup](https://nextjs.org/docs/basic-features/typescript) as normal (package.json scripts are already set).

i.e: `touch tsconfig.json`

Then you can create components and pages in `.tsx` or `.ts`

**next.config.js** and **server.js** must remain in **\*.js** format.

## Improvements over previous examples

- local testing with Firebase emulator. This should just be a sanity check before deploying. Development should be done with `next dev`.
  - `firebase serve` uses locally hosted static files with production (**deployed**) HTTP functions. [Source: Firebase docs](https://firebase.google.com/docs/hosting/deploying#test-locally).
- simplified build and deploy scripts in `package.json`
- simplified folder structure
- no issues with duplicate static file serving (images/css)
- serves static Next.js content from CDN first, then fallback to SSR app on Cloud Functions

## Caveats

- Running the Firebase emulator does not work well with Next.js in development mode. You shouldn't really develop with the Cloud Function being involved. `next dev` should be used for development. If you need a test env before production, you should have another project or Firebase web app for testing your deployed function.
  - `firebase emulators:start` is the command to run the local emulators
- Next.js [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) is currently untested by myself and others have reported issues (see https://github.com/jthegedus/firebase-gcp-examples/issues/133). If someone manages to get this working, please share and I will update this example.
- To add other Cloud Functions to your app (including writing them in TypeScript), I would suggest:

  - putting this entire `functions-nextjs` directory in a folder called `app/`
  - then create my repo structure like this
  - for the `functions/` dir, follow the official docs from here: https://firebase.google.com/docs/functions/typescript

    ```
    ┌ .tool-versions      <-- move this here. See https://asdf-vm.com
    | app/                <-- functions-nextjs example under this app/ folder
    | ├ components/
    | | └ ...
    | ├ helpers/
    | | └ ...
    | ├ pages/
    | | └ ...
    | ├ public/
    | | └ ...
    | ├ scripts/
    | | └ ...
    | ├ .gitignore
    | ├ firebase.json     <-- Contains Hosting with Deploy Targets
    | ├ firestore.rules
    | ├ next.config.js
    | ├ package-lock.json
    | ├ package.json
    | └ server.js         <-- Next.js Cloud Function prefixed to avoid clashes
    └ functions/          <-- All other backend functions
      ├ firebase.json     <-- Contains only Functions config.
      ├ package.json
      ├ tsconfig.json
      ├ src/
      | └ index.ts        <-- main source file for your Cloud Functions
      └ lib/                  Cloud Function prefixing to avoid clashes
        ├ index.js        <-- compiled JavaScript code
        └ index.js.map    <-- source map for debugging
    ```

## Future

I intend to make a more complete Next.js App example that covers:

- potentially hoisting Next.js static pages to the CDN (SSG and Automatic Static Optimization pages)
  - idea is described here - https://gist.github.com/jthegedus/8e820d37e1f3768f991886fb65de154f
- Other Cloud Functions in your app
- Firebase SDK dynamic importing ([Next.js has Dynamic import support OOTB](https://nextjs.org/docs/advanced-features/dynamic-import))
- Firebase Authentication.
  - My thoughts here is that you should not do SSR with any private content and so only deal with Authentication client-side. Next.js static optimization of pages without any `getInitialProps`/`getServerSideProps` makes this easier to reason about compared to previous Next.js versions.
- Listening to Firestore data directly

I would highly recommend either [reactfire](https://github.com/FirebaseExtended/reactfire/) or until that is ready for prime time [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks).
