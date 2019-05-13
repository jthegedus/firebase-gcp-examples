<div align="center">

# Berglas with Node.js on Cloud Run

runtime secret decryption with Golang in Node.js

<!-- img goes here -->

</div>

Berglas is a Golang tool for storing encrypted secrets in GCP and decrypting them at runtime. Developing a similar tool in every runtime environment (Node.js, Ruby etc) would be [very costly and fragment the effort to keep the tool exploit-free and our secrets safe][berglas-runtimes]. Cloud Run being built upon containers allows us to bake Golang and Berglas into our image alongside whichever runtime we wish to develop in. This is an example showing how to do so in Node.js.

[berglas-runtimes]: https://github.com/GoogleCloudPlatform/berglas/issues/19

## Outline

The goals of this example are:

- init Berglas in your GCP Project
- create & encrypt a secret to be used by your Cloud Run service
- allow Cloud Run access to your encrypted secret
- build your Cloud Run Docker Image & push to GCR
- deploy your image from GCR to Cloud Run

The instructions for this example should be performed within the [Google Cloud Platform Cloud Shell][cloud-shell] of your desired project.

⚠️ This is a simple example to demostrate the idea of Berglas with Node.js, I do not recommend using the provided helper scripts to orchestrate a production deployment. Noteably, the `build.sh` and `deploy.sh` scripts should be part of your CI triggered from code changes.

[cloud-shell]: https://cloud.google.com/shell/

## Berglas

Berglas performs a number of tasks to prepare you envrionment and decrypt secrets at runtime. The [docs are well maintained so please see them][berglas-docs] for more information on how Berglas functions.

[berglas-docs]: https://github.com/GoogleCloudPlatform/berglas

### Bootstrap

- configures a GCS bucket to hold your secrets (you can provide a name & location etc)
- configures a KMS keyring to be used to encrypt your secrets
- configures audit logging to the Storage and KMS APIs

### Encrypt

- create a secret in the storage location encrypted with the KMS Key
- allow Cloud Run Service Account access to the secret

### Runtime

Berglas is baked into the Docker image and runs before our JS code. In our code we have access to the decrypted secrets via `process.env.*`.

see `helloService/src/function.js`

## Usage

🚨 These instructions should be performed from your GCP project's Cloud Shell CLI.

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

# deploy your image w the provided secret path
./deploy.sh "api-key"
```
