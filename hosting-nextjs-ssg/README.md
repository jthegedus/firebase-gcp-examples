<div align="center">

# Next.js Static Site Generation (SSG) on Firebase with Firebase Hosting & Firestore

</div>

Next.js recently added [Static Site Generation (SSG) support](https://nextjs.org/blog/next-9-3) with any data source as a build-time optimization for pages who's data is already known. This method avoids Server-Side Rendering for pages who's content is known at build-time.

This example uses `next build && next export` with the data for the `/posts/[slug].js` pages pulled from Firestore at build-time to produce a static site hosting on Firebase Hosting. Noteabley, `getStaticPaths()` has the `fallback` value set to `false`, which means if there is not HTML match for the requests `/posts/:slug`, then a `404` will ocurr.

Live example here: https://nextjs-ssg.web.app/

## Setup

```shell
# install
npm install
# setup Firebase config to deploy
firebase login
firebase use --add
```

- replace `TODO_YOUR_PROJECT_ID_HERE` in `next.config.js` with your project's ID
- Populate your Firestore database with data. This example uses the following data structure:
  - posts (root collection)
    - [auto-generated document ids]
      - (string: text) title
      - (string: text) blurb
      - (string: html) content

## Usage

```
# dev
next dev
# build production
next build
# start production locally
next start
# deploy to Firebase Hosting
npm run deploy
```

## Note Well

- Firestore data is not updated in realtime for these pages. It is pulled by REST API calls during the `getStaticProps()` and `getStaticPaths()` function calls on particular pages.
- Content **cannot** be updated without a full site rebuild.
- No dynamic content is rendered for `/posts/:slug` as `getStaticPaths()` `fallback` is set to `false` meaning a failure to match with an existing HTML file will `404`.

## Advantages to SSR

- Site is compltely hosted on the Firebase CDN so pages load as fast as can be (available in 10s of miliseconds instead of 100s/1000s).
- Simplified development. Fewer npm scripts and no shuffling of folders.
- Development mode of nextjs works much better and without caveats as with Firebase Cloud Functions SSR method.
