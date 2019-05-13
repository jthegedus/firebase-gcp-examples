#!/usr/bin/env bash

set -u

# validate args
if [[ $# -eq 0 ]] ; then
  echo "requires 2 args"
  echo "1: <environment variable name>"
  echo "2: <the key you want to encrypt and store>"
  exit 1
fi

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "required variables not provided"
  exit 1;
fi

echo "storing encrypted key"

PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
export PROJECT_ID
export BUCKET_ID="berglas-secrets-${PROJECT_ID}"
export KMS_LOCATION=global
export KMS_KEYRING=berglas
export KMS_CRYPTO_KEY=berglas-key
export KMS_KEY="projects/${PROJECT_ID}/locations/${KMS_LOCATION}/keyRings/${KMS_KEYRING}/cryptoKeys/${KMS_CRYPTO_KEY}"

docker pull gcr.io/berglas/berglas:latest
docker run gcr.io/berglas/berglas create "${BUCKET_ID}/${1}" "${2}" \
  --key "${KMS_KEY}"


# enable the Cloud Run Service Account access to the Cloud Run Env Vars
PROJECT_NUMBER=$(gcloud projects describe "${PROJECT_ID}" --format 'value(projectNumber)')
export PROJECT_NUMBER
export SA_EMAIL=${PROJECT_NUMBER}-compute@developer.gserviceaccount.com

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member "serviceAccount:${SA_EMAIL}" \
  --role roles/run.viewer

# grant the Cloud Run Service Account access to the Berglas secrets
docker pull gcr.io/berglas/berglas:latest
docker run gcr.io/berglas/berglas grant "${BUCKET_ID}/${1}" --member "serviceAccount:${SA_EMAIL}"
