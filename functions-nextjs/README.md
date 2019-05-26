<div align="center">

# Next.js SSR React on Cloud Functions for Firebase with Firebase Hosting

</div>

Cloud Functions and Next.js can combine to provide a low-cost auto-scaling, SSR app experience.

Firebase Hosting can [rewrite routes to a Cloud Function][function-rewrites] that serves our server-side rendered Next.js React app. Using a rewrite rule that catches **all** routes, we pass the request information to Next.js to produce our page per request. This results in our app being served on our Hosting URL instead of the Cloud Function URL:

`<project-name>.firebaseapp.com/`

`<project-name>.web.app/`

instead of:

`https://us-central1-<project-name>.cloudfunctions.net/<function-name>`

The accompanying [Medium post][medium-nextjs] goes into more detail.

## Usage

```shell
# install
yarn
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

## Notes

- Due to the [Firebase Hosting route priority][fb-route-priority] any static files should be included in the Firebase `public/` folder instead of the Next.js `static/` folder.
- to get `serve` script to work I believe you are required to run Node.js `6.x` locally
- for more information about uploading the entire folder as the function's source, see my blog post about microservices with Firebase.

[function-rewrites]: https://firebase.google.com/docs/hosting/full-config#section-rewrites
[fb-route-priority]: https://firebase.google.com/docs/hosting/full-config#hosting_priority_order
[medium-nextjs]: https://medium.com/@jthegedus/table-of-contents-ec337953b39b
[nextjs]: https://nextjs.org/
