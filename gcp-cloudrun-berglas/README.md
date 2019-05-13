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

Broadly you need to:

- init Berglas in your GCP Project
- create & encrypt a secret to be used by your Cloud Run service
- allow Cloud Run access to your encrypted file
- build your Cloud Run Docker Image & push to GCR
- deploy your Image to Cloud Run

## Usage

```shell
# Open you GCP project Cloud Shell

# git clone
git clone https://github.com/jthegedus/firebase-gcp-examples/
cd firebase-gcp-examples/gcp-cloudrun-berglas/berglas-setup
chmod +x 01-bootstrap.sh 02-encrypt.sh

# init berglas
./01-bootstrap.sh

# encrypt & store a secret, then provide access to Cloud Run Service Account
./02-encrypt.sh "api-key" "super secret test api key"

# prepare Build & Deploy steps
cd ../helloService
chmod +x build.sh deploy.sh

# build your image
./build.sh

# deploy your image
./deploy.sh "api-key"
```
