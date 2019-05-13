#!/usr/bin/env bash
set -u

# validate args
if [[ $# -eq 0 ]] ; then
  echo "requires 1 arg"
  echo "1: <environment variable name>"
fi

if [ -z "$1" ]; then
  echo "required variables not provided"
  echo "requires 1 arg"
  echo "1: <environment variable name>"
  exit 1;
fi


PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
export PACKAGE_VERSION

PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
export PROJECT_ID
export BUCKET_ID="berglas-secrets-${PROJECT_ID}"

gcloud beta run deploy berglas-example-node \
  --project "${PROJECT_ID}" \
  --region us-central1 \
  --image "gcr.io/${PROJECT_ID}/berglas-example-node:${PACKAGE_VERSION}" \
  --memory 1G \
  --concurrency 10 \
  --set-env-vars "API_KEY=berglas://${BUCKET_ID}/${1}" \
  --allow-unauthenticated
