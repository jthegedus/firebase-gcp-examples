<div align="center">

# [Next.js][nextjs] SSR React on Cloud Functions for Firebase with Firebase Hosting

</div>

Cloud Functions and Next.js can combine to provide a low-cost auto-scaling, SSR app experience.

Firebase Hosting can [rewrite routes to a Cloud Function][function-rewrites] that serves our server-side rendered Next.js React app. Using a rewrite rule that catches **all** routes, we pass the request information to Next.js to produce our page per request. This results in our app being served on our Hosting URL instead of the Cloud Function URL:

`<project-name>.firebaseapp.com/` & `<project-name>.web.app/`

instead of:

`https://us-central1-<project-name>.cloudfunctions.net/<function-name>`

The accompanying [Medium post][medium-nextjs] (TBA) goes into more detail.

## Usage

```shell
# install
yarn install
# setup: setup firebase config to deploy
yarn setup
# watch
yarn watch
# build
yarn build
# locally test
yarn serve
# deploy to firebase
yarn deploy
```

## Notes ⚠️

- Due to the [Firebase Hosting route priority][fb-route-priority] any static files should be included in the Firebase `public/` folder instead of the Next.js `static/` folder.
- the `serve` script is not working out of the box for a number of reasons:
  - the current functions emulator requires Node.js `6.x` which means changing your  `src/server/.babelrc` & `package.json.engines`  targets to Node.js `6.x`. Additionally, [Node.js 6 is deprecated by Firebase](https://github.com/firebase/firebase-tools/pull/1223). You could circumvent this issue by using `yarn install --ignore-engines`, though I personally do not recommend this (ignore-engines is a foot🔫 in my experience).
  - there is a [new emulator tool coming](https://github.com/firebase/firebase-tools/issues/1214) based upon the [new functions-framework](https://github.com/GoogleCloudPlatform/functions-framework-nodejs) which will land soon.
  - there is also [a known bug](https://github.com/firebase/firebase-tools/issues/1337) with `yarn serve` (as pointed out by @rioam2 [here](https://github.com/jthegedus/firebase-gcp-examples/pull/44)) which will be fixed in the `7.0.0` release of `firebase-tools` (which may or may not include the new emulator).
- for more information about uploading the entire folder as the function's source, see my blog post about [microservices with Firebase][fb-microservices] (TBA).

## Differences from previous example

- the `src/` and `dist/` folder are deployed alongside one another
- no need to randomly copy files between places

[function-rewrites]: https://firebase.google.com/docs/hosting/full-config#section-rewrites
[fb-route-priority]: https://firebase.google.com/docs/hosting/full-config#hosting_priority_order
[medium-nextjs]: https://medium.com/@jthegedus/table-of-contents-ec337953b39b
[nextjs]: https://nextjs.org/
[fb-microservices]: https://medium.com/@jthegedus/table-of-contents-ec337953b39b
