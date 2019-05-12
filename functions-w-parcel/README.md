<div align="center">

# Cloud Functions with ParcelJS

[ParcelJS][parcel] supports Flow, TypeScript, ReasonML and more out of the box. The significance here is the setup uses the same npm scripts regardless of the language you write!!! Just swap out the `src/*` code and some of the auxilliary config files (eg: `tsconfig.json`). See below for details.

The [theory medium post][medium-post-theory] covers the basic configuration compiling Cloud Functions requires. The subsequent [medium post covers][medium-post-code] the actual setup for each variation of Flow, TypeScript & ReasonML.

</div>

## Usage

```shell
# install
yarn
# setup: setup firebase config to deploy
yarn setup
# build
yarn build
# or use watch
yarn watch
# locally test
yarn serve
# deploy to firebase
yarn deploy
```

## ParcelJS

For more on Parcel I highly recommend checking out their [docs][parcel] and [examples][parcel-examples]!

## Flow

If you wish to use [Flow][flow] with this setup make the following changes:

- remove `tsconfig.json`
- use the `.js` file suffix
- add `// @flow` to the top of each file you wish to type with Flow
- remove TS devdeps `yarn remove typescript`

## ReasonML

If you wish to use [ReasonML][reasonml] using the same npm scripts, simply make the following changes:

- remove `tsconfig.json`
- write your Cloud Function sig with regular JS & import `.re` files as you would any other. Eg:

```js
import * as functions from 'firebase-functions';
import { reasonMessage } from './Main.re';

export let parcelReasonML = functions.https.onRequest((req, res) => {
  let world = reasonMessage();
  res.status(200).send(`Hello ${world}`);
});
```

Not quite native ReasonML, but I'm working on something for that 😉

<!-- links -->

[parcel]: https://parceljs.org/
[parcel-examples]: https://github.com/parcel-bundler/examples
[medium-post-theory]: https://medium.com/@jthegedus/cloud-functions-for-firebase-with-compiled-code-e234e83462dc
[medium-post-code]: https://medium.com/@jthegedus/cloud-functions-for-firebase-with-flow-typescript-reasonml-via-parceljs-bf94dd5b325c
[flow]: https://flow.org/
