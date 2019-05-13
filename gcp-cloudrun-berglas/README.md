<div align="center">

# Berglas with Node.js on Cloud Run

</div>

This example has a lot going on. Let's break it down:

- Use a Golang lib with a Node.js stateless server
  - Berglas minimal deps for Golang
  - Node.js Functions Framework with Cloud Run
- Deploy to Cloud Run via CI
  - build.sh: uses `gcloud` to build in Cloud Build
  - deploy.sh: uses `gcloud` to initiate deploy of new image in GCR
- asdf

## Steps

- init Berglas in your GCP Project
- create & encrypt a secret to be used by your Cloud Run service
- allow Cloud Run access to your encrypted file
-
