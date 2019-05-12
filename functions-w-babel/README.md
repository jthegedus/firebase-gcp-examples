<div align="center">

# Cloud Functions with Babel

Compile your Cloud Functions with [Babel][babel] enabling newer JavaScript syntax and features.

The [theory medium post][medium-post-theory] covers the basic configuration compiling Cloud Functions requires. The subsequent [medium post covers][medium-post-code] the actual setup for each variation.

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

## Flow

If you wish to use [Flow][flow] with this setup make the following changes:

```shell
# add deps
yarn add -D @babel/preset-flow
```

and add the Flow preset to the `.babelrc` file as such:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { "node": "8.16.0" }
      }
    ],
    ["@babel/preset-flow"]
  ]
}
```

<!-- links -->

[babel]: https://babeljs.io/
[medium-post-theory]: https://medium.com/@jthegedus/cloud-functions-for-firebase-with-compiled-code-e234e83462dc
[medium-post-code]: https://medium.com/@jthegedus/cloud-functions-for-firebase-with-babel-flow-typescript-796606628d37
[flow]: https://flow.org/
