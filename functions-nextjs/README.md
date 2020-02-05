<div align="center">

# [Next.js][nextjs] SSR React on Cloud Functions for Firebase with Firebase Hosting

</div>

Cloud Functions and Next.js can combine to provide a low-cost auto-scaling, SSR app experience.

Firebase Hosting can [rewrite routes to a Cloud Function][function-rewrites] that serves our server-side rendered Next.js React app. Using a rewrite rule that catches **all** routes, we pass the request information to Next.js to produce our page per request. This results in our app being served on our Hosting URL instead of the Cloud Function URL:

`<project-name>.firebaseapp.com/` & `<project-name>.web.app/`

instead of:

`https://us-central1-<project-name>.cloudfunctions.net/<function-name>`

The accompanying [Medium post][medium-nextjs] (TBA) goes into more detail.

## Usage ℹ️

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
- I will be going into more detail about uploading the entire `src/` folder as the function's source in the near future.

## Differences from previous example ✨

- the `src/` and `dist/` folder are deployed alongside one another
- no need to randomly copy files between places
- `yarn serve` works out of the box

[function-rewrites]: https://firebase.google.com/docs/hosting/full-config#section-rewrites
[fb-route-priority]: https://firebase.google.com/docs/hosting/full-config#hosting_priority_order
[medium-nextjs]: https://medium.com/@jthegedus/table-of-contents-ec337953b39b
[nextjs]: https://nextjs.org/
