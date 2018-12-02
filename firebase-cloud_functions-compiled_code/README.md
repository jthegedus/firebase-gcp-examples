<h1 align="center">Cloud Functions for Firebase & Compiled Code</h1>

<p align="center">Compile to the correct Node runtime using <a href="https://babeljs.io/">Babel</a> or <a href="https://parceljs.org/">ParcelJS</a></p>

<!-- toc -->

<p align="center">
    <em>
    <a href="#description">Description</a>
    · <a href="#download_install_setup">Download, Install & Setup</a>
    · <a href="#run">Run</a>
    </em>
</p>

<!-- title img -->

<figure>
    <img
        src='https://cdn-images-1.medium.com/max/1000/1*BLquFMCvPWkIB7Is2HGIgg.png'
        title='Cloud Functions for Firebase with Compiled Code'
        alt="Babel"
    />
</figure>

<h3 align="center">Blog Posts</h3>

📚 Theory: [Cloud Functions for Firebase with Compiled Code](https://medium.com/@jthegedus/cloud-functions-for-firebase-with-compiled-code-e234e83462dc)

💻 Part 1: [Cloud Functions for Firebase with Babel, Flow & TypeScript](https://medium.com/@jthegedus/cloud-functions-for-firebase-with-babel-flow-typescript-796606628d37)

💻 Part 2: [Cloud Functions for Firebase with Flow, TypeScript & ReasonML via ParcelJS](https://medium.com/@jthegedus/cloud-functions-for-firebase-with-flow-typescript-reasonml-via-parceljs-bf94dd5b325c)

<!-- contents -->

<h2 id="description">Description</h2>

### Folder Structure & TLDR

```
+- dist/           # compiled code
|  |
|  +- index.js     # CF entrypoint, defined by pkg.json "main" field
|  +- index.js.map # maps compiled to raw source in ../src/
+- node_modules/   # ignored by firebase-tools on upload
+- src/            # raw source code
|  |
|  +- index.<ext>  # entrypoint to compile
+- <config file>   # preset-env defines the Node version target
+- .firebaserc     # firebase project identification config
+- firebase.json   # folder to deploy (this folder)
+- package.json    # deps, entrypoint (main field) & npm scripts
```

Each example uses this same structure, but has different npm `scripts`, `devDependencies` and compilation `entrypoint`. Reading the source should make sense, but you can also see the blog posts for further details.

<h2 id="download_install_setup">Download, Install & Setup</h2>

```shell
# clone this dir
curl https://codeload.github.com/jthegedus/firebase-gcp-examples/tar.gz/master | tar -xz --strip=1 firebase-gcp-examples-master/firebase-cloud_functions-compiled_code
# cd
cd firebase-cloud_functions-compiled_code
```

### Choose an example & Install

```shell
# for example
cd parcel-typescript
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
