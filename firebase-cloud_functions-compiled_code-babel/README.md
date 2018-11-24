meant to be simple examples:

- babel - target firebase function runtime
- flow - types
- ts - types

Functions emulator comes at an huge ops cost! just use a testing env
if using function emulator, must use node6, must compile to node6, cannot use --source-maps in ParcelJS

NO need to bundle node_modules with parceljs as the deps are installed in the cloud functions runtime

all examples should

- src maps
- serving with watcher running (although you must refresh the urls yourself)

## Babel - target node version with preset-env

## TypeScript

must target a version of EMACScript, which involves more work

## Parcel Flow

parcel can target node versions

- parceljs - uses babel preset-env by default. unfortunately it has conflicting defaults with firebase. when `engines.node` is not specified, Firebase assumes Node 6, whereas Parcel assumes the most recent LTS, Node 8. So we must specify Node 6 (as the functions emulator only gets installed and runs with `engines.node` set to Node 6). If you don't use the functions emulator then you can specify Node 8.

## Parcel TS

parcel

## simple project structure

```json
{
  "hosting": {
    "public": "public/dist/"
  },
  "functions": {
    "source": "functions/"
  }
}
```

```
myproject
+- firebase.json # Root level firebase config for entire project
+- functions/ # Directory containing all your functions code
    |
    +- package.json # npm package file describing your Cloud Functions code
    |
    +- tsconfig.json
    |
    +- tslint.json # Optional file
    |
    +- src/ # Directory containing TypeScript source
    |    |
    |    +- index.ts # main source file for your Cloud Functions code
    |
    +- lib/
    |
    +- index.js # Built/transpiled JavaScript code
    |
    +- index.js.map # Source map for debugging
+- public/ # website
    |
    +- index.html
    |
    +- index.css
```

## microservices

```
myproject
+- App
    |
    +- firebase.json    # descibes firebase deployment infor for App/
    +- package.json     # website deps
    +- tsconfig.json
    +- src/             # website src, compiles to dist/
    +- dist/            # compiled site to be deployed
    +- public/          # website static files, copies to dist/

+- DomainX              # backend service of app - domain X
    |
    +- firebase.json    # describes how to deploy this service
    +- package.json     # deps for this service
    +- tsconfig.json
    +- src/             # raw src for service. compiles to dist/
    +- dist/            # compiled output. pkg.json main field points cloud functions to here to execute

+- DomainY              # backend service of app - domain Y. same as DomainX except you can configure other langs etc
```

App/firebase.json

```json
{
  "hosting": {
    "public": "dist/"
  }
}
```

DomainX/firebase.json

```json
{
  "functions": {
    "source": "."
  }
}
```

src/ and dist/ are deployed so that source-maps works.

or

```
+- DomainY              # backend service of app - domain Y
    |
    |                   # CONFIGURATION at ROOT
    |
    +- firebase.json    # deploys functions/
    +- package.json     # DevDeps for this service
    +- tsconfig.json
    +- functions
        |
        |               # ONLY CODE to deploy
        |
        +- package.json     # Deps for this service
        +- src/             # raw src for service. compiles to dist/
        +- dist/            # compiled output. pkg.json main field points cloud functions to here to execute
```
