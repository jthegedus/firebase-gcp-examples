<h1 align="center">Babel & Cloud Functions for Firebase</h1>

<p align="center">Compile to the correct Node runtime using <code>@babel/preset-env</code></p>

<!-- toc -->

<p align="center">
    <em>
    <a href="#description">Description</a>
    · <a href="#download_install_setup">Download, Install & Setup</a>
    · <a href="#run">Run</a>
    </em>
</p>

<!-- title img -->

<a href='https://medium.com/@jthegedus/babel-cloud-functions-for-firebase-796606628d37'>
<figure>
    <img
        src='https://cdn-images-1.medium.com/max/1000/1*ikqwah22cSHbiI5GiG1DtQ.gif'
        title='Babel & Cloud Functions for Firebase'
        alt="Babel"
    />
    <figcaption align='center'>
        <i>Babel & Cloud Functions for Firebase</i>
    </figcaption>
</figure>
</a>

<!-- contents -->

<h2 id="description">Description</h2>

### Folder Structure & TLDR

```
+- dist/            # compiled code
|  |
|  +- index.js     # CF entrypoint, defined by pkg.json "main" field
|  +- index.js.map # maps compiled to raw source in ../src/
+- node_modules/   # ignored by firebase-tools on upload
+- src/            # raw source code
|  |
|  +- index.js
+- .babelrc        # preset-env defines the Node version target
+- firebase.json   # folder to deploy (this folder)
+- package.json    # deps, entrypoint (main field) & npm scripts
```

<details>
<summary>Going into more Depth</summary>

`.babelrc`  defines via `@babel/preset-env` the Node version to compile to. In this case, Node 6.11.5

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { "node": "6.11.5" }
      }
    ]
  ]
}
```

`firebase.json`  defines the folder to deploy. In this case, we will deploy the root folder

```json
// .firebase.json
{ "functions": { "source": "." } }
```

`firebase-tools` will ignore `node_modules` on upload as Cloud Functions itself installs the dependencies in the cloud 💯 We will need to deploy:

- `dist/` for the compiled code
- `src/` for the original code enabling source maps with Cloud Function logs
- `package.json` for the reasons discussed below.

`package.json` defines our:

- scripts : `watch`, `serve` & `deploy` scripts are the core scripts to use. The `compile` script executes the `@babel/cli` tool and compiles our code with source maps.

```json
// package.json
{
  "compile": "babel 'src' --out-dir 'dist' --source-maps",
  "watch": "yarn compile --watch",
  "serve": "yarn watch & yarn firebase serve --only functions",
  "predeploy": "yarn compile",
  "deploy": "yarn firebase deploy --only functions"
}
```

- dependencies : the deps for Cloud Functions to install in the cloud.

- main : this is the most important field of all. This defines the entrypoint to your code that Cloud Functions will execute. Since we are uploading the root folder, our entrypoint is located by:

```json
{
  "main": "dist/index.js"
}
```

</details>

<h2 id="download_install_setup">Download, Install & Setup</h2>

```shell
# clone this dir
curl https://codeload.github.com/jthegedus/firebase-gcp-examples/tar.gz/master | tar -xz --strip=1 firebase-gcp-examples-master/firebase-cloud_functions-compiled_code-babel
# cd
cd firebase-cloud_functions-compiled_code-babel
# install
yarn
```

### Add `.firebaserc`

```shell
yarn createConfig
```

and replace `<project-id>` with your project's id.

### Login to Firebase CLI

This example uses `firebase-tools` as a DevDep, so you can simply run

```shell
yarn firebase login
```

and `yarn` will use the `node_modules` installed version of `firebase-tools`.

<h2 id="run">Run</h2>

### Compile with File Watching

```shell
yarn watch
```

### Local Emulation

```shell
yarn serve
```

**N.B.**: To use the Firebase local emulator you must use Node 6 as it does not yet support running on Node 8.

### Deploy

```shell
yarn deploy
```
