# Firebase Bundle Analysis

A look at the different ways of importing the Firebase SDK and the affect on your app's bundle size.

The accompanying [Medium Post](https://medium.com/@jthegedus/firebase-package-names-and-bundle-sizes-ec10cede63f1).

## Download, Install & Run

```bash
# Clone
git clone https://codeload.github.com/jthegedus/blog-examples/tar.gz/master | tar -xz --strip=2 blog-examples/firebase-namespaced-packages
cd firebase-namespaced-packages
# Install
yarn
# Development
yarn dev
# Analyze
yarn analyze
```

## Credit

This example is modified from [this Next.js example](https://github.com/zeit/next.js/tree/canary/examples/with-webpack-bundle-analyzer).
