# with Firebase Hosting & Cloud Functions example

Host a Next.js app on Firebase using Firebase Hosting and Cloud Function rewrite rules.

Using [Firebase Hosting priority order](https://firebase.google.com/docs/hosting/full-config#hosting_priority_order) we will serve all static content from the Firebase CDN and then any request misses will be fulfilled by the Cloud Functions hosted Next.js app via [Firebase Hosting rewrites](https://firebase.google.com/docs/hosting/full-config#rewrites).

## Contents

- [Nextjs Page Types](#nextjs-page-types)
- [Need to Know](#need-to-know)
- [How to Use](#how-to-use)
  - [Setup Firebase](#setup-firebase)
  - [Install and Run](#install-and-run)
- [TypeScript](#typescript)
- [Improvements over previous examples](#improvements-over-previous-examples)
- [Caveats](#caveats)
- [References](#references)

## Nextjs Page Types

With the [release of Next.js 9.3+](https://nextjs.org/blog/next-9-3) new APIs allow for a variety of different page types depending on use case and combination.

This example demonstrates the 3 page types of Next.js:

- static pages
- SSR pages
- SSG pages (with fallback)

### Static Pages

- `/pages/index.js`: A homepage which performs a client-side query to an API for some data.
- `/pages/about.js`: About page.

### SSR Pages

Using `getServerSideProps()`.

- `/pages/blog/index.js`: A blog list page rendered per request with data fetching every request.

### SSG Pages

Using `getStaticProps()` and `getStaticPaths()` with `fallback: true`.

- `/pages/blog/[post].js`: Individual blog posts rendered on **first** request to the URL, then cached indefinitely (until next deployment). Data is fetched from Firestore database.

With `fallback:true`, these pages are generated at build-time from the list of paths from `getStaticPaths()`. Any pages not rendered at build time will be rendered on first request. By intentionally not producing paths in `getStaticPaths()` we get no build-time pages and only pages built on first request.

If `fallback: false` was used, pages would only be generated at build-time and a `404` would be served for none pre-rendered pages.

## Need to Know

- [Firebase Hosting priority order](https://firebase.google.com/docs/hosting/full-config#hosting_priority_order)
- `firebase.json` contains the rewrite rule to catch all CDN misses and call our Next.js Cloud Function
- specifying `"engines": { "node: "10" }` in `package.json` is required to indicate to Firebase to the version of node for the Cloud Function
- `firebase-tools` version `8.x.x` or higher should be used as it will set the Cloud Function's IAM permission to be callable without authentication.
- [Firebase Cloud Function Groups](https://firebase.google.com/docs/functions/organize-functions#group_functions) are used to isolate the Next.js server function from the rest in your project. This allows you to deploy just the Next.js app without redeploying all other Cloud Functions. It also avoids Cloud Function name clashes.
- [Firebase Deploy Targets](https://firebase.google.com/docs/cli/targets#set-up-deploy-target-hosting) are used to isolate the Next.js app from the rest of your Firebase project. Since Firebase allows multiple websites, databases etc per project, we want to be explicit about which app we're deploying in our project.

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init next-app --example with-firebase-hosting with-firebase-hosting-app
# or
yarn create next-app --example with-firebase-hosting with-firebase-hosting-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-firebase-hosting
cd with-firebase-hosting
```

### Setup Firebase

TODO:

- init/create app or select an existing project with `firebase use --add`
- update `firebase.json` hosting target

### Install and Run:

```shell
npm install
npm run dev
# or
yarn
yarn dev

# to run Firebase locally for testing:
npm run serve

# to deploy it to Firebase:
npm run deploy
```

## TypeScript

To use Typescript, simply follow [Typescript setup](https://nextjs.org/docs/basic-features/typescript) as normal (package.json scripts are already set).

i.e: `touch tsconfig.json`

Then you can create components and pages in `.tsx` or `.ts`

**next.config.js** and **server.js** must remain in **\*.js** format.

## Improvements over previous examples

- simplified build and deploy scripts in `package.json`
- simplified folder structure
- no issues with duplicate static file serving (images/css)
- serves Next.js content from CDN first

## Caveats

TODO:

- copying static contents manually (through `npm` script and not `next export`. See https://github.com/zeit/next.js/issues/12313)
- other cloud functions

## References

- [geovanisouza92/serverless-firebase](https://github.com/geovanisouza92/serverless-firebase) repo
- [jthegedus/firebase-gcp-example](https://github.com/jthegedus/firebase-gcp-examples) repo
- [this medium article](https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2)
- [Crash Course: Node.js apps on Firebase Hosting](https://youtu.be/LOeioOKUKI8)
- [Firebase CLI Documentation](https://firebase.google.com/docs/cli).

---

# Next Export performs & thus these can be removed from server-side deployment

```
(copy static folder)
.next/static                         -> out/_next/static

(copy prerendered .html files (without route regex in name))
.next/server/static/{build_id}/pages -> out/

(copy prerendered .json data files)
.next/server/static/{build_id}/pages -> out/_next/data/{build_id}

(copy public folder)
public                               -> out/
```

# Firebase SSG w Server Rendered missing paths

- creates a page with `s-maxage` set to a high value so cannot update page until next `next export`
- Perhaps Firebase with SSG is not ideal and we should stick to SSR where we set the cache limit of the returned page.
- Does Firebase or Next.js set the high `s-maxage` in SSG mode?
  - Next.js sets the s-maxage in https://github.com/zeit/next.js/blob/18036d4e5198b6375a849c584c8b5a822ee41952/packages/next/next-server/server/send-payload.ts#L45
- Can we still do `next export` with SSR pages?
  - NO WE CANNOT

# Before Firebase NPM Packages

```
Page                               Size     First Load JS
┌ ● /                              1.42 kB        66.1 kB
├ ○ /404                           2.6 kB         60.6 kB
├ ○ /about                         1.57 kB        66.2 kB
└ ● /posts/[slug]                  1.3 kB           66 kB
    ├ /posts/1NxAmI3299xqarEyHntH
    ├ /posts/56IRj3PO75cVhTwztm8b
    ├ /posts/70piYG5vLYts69pIcbTA
    └ [+3 more paths]
+ First Load JS shared by all      58 kB
  ├ static/pages/_app.js           957 B
  ├ chunks/commons.d3a5ca.js       10.5 kB
  ├ chunks/framework.98c1b2.js     40 kB
  ├ runtime/main.58d2ec.js         5.84 kB
  └ runtime/webpack.b65cab.js      746 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

# After Firebase NPM Packages

```
Page                               Size     First Load JS
┌ λ /                              4.46 kB        69.2 kB
├ ○ /404                           2.6 kB         60.7 kB
├ ○ /about                         1.57 kB        66.3 kB
└ ● /posts/[slug]                  1.31 kB        66.1 kB
    ├ /posts/70piYG5vLYts69pIcbTA
    ├ /posts/da3Eyo3JebUIzHgyia7T
    ├ /posts/lsIPgRimCQEpVKyBKh6g
    └ /posts/ncLO0ihGGBx6yJ4uF3xI
+ First Load JS shared by all      58.1 kB
  ├ static/pages/_app.js           954 B
  ├ chunks/commons.4d8a30.js       10.5 kB
  ├ chunks/framework.e84fa6.js     40 kB
  ├ runtime/main.04856c.js         5.87 kB
  └ runtime/webpack.c21266.js      746 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
```

# Firebase SSR w server rendered missing paths

<p>Here is some content.</p><p>Install Firebase with <code>asdf install firebase 8.1.1</code>

# Next.js SSG on Firebase

- use `next export` to produce the cacheable static files
  - `next export` prohibits the use of `getServerSideProps()`
- must use `getStaticPaths()` to set `fallback : true`

# Next.js options

```
SSG -> getStaticProps     -> build         -> HTML + JSON
SSG -> getStaticPaths     -> first request -> HTML (fallback) + JSON
SSR -> getServerSideProps -> each request  -> HTML
CCR -> getServerSideProps -> each request  -> HTML (cache indefinitely)
    -> on content change, invalidate CDN cache of the page
```

```
getStaticProps
getStaticProps + getStaticPaths (dynamic routes only)
getStaticProps + getStaticPaths + fallback:true (dynamic routes only)
getServerSideProps
```

- static: next export
- static with build time data fetching: getStaticProps & next export
- static with build time data fetching of dynamic paths: getStaticProps + getStaticPaths & next export
- dynamic with first request data fetch for dynamic paths: getStaticProps + getStaticPaths + fallback:true
- dynamic with each request data fetch for static or dynamic paths: getStaticProps + getStaticPaths + fallback:true + getServerSideProps
