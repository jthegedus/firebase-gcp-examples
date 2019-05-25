<div align="center">

# Firebase & Microservices

This example explores a folder structure to enable microservice development where multiple teams own different aspects of a single Firebase supported product.

> The accompanying [Medium Post](https://medium.com/@jthegedus/scaling-firebase-development-973f71074f72) goes into more detail about the solution.

</div>

## Setup

Install all service dependencies from the root with:

```shell
yarn iall
```

Now that all the dependencies are installed, go into each service folder and run:

```shell
yarn setup
```

This will prompt you to specify the Firebase project you want to install into.

## Build & Run

```shell
# Build
yarn build

# Deploy
yarn deploy
```
