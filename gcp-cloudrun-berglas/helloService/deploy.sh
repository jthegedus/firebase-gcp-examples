#!/usr/bin/env bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
export PACKAGE_VERSION

PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
export PROJECT_ID

gcloud beta run deploy berglas-example-node \
  --project "${PROJECT_ID}" \
  --region us-central1 \
  --image "gcr.io/${PROJECT_ID}/berglas-example-node:${PACKAGE_VERSION}" \
  --memory 1G \
  --concurrency 10 \
  --set-env-vars "API_KEY=berglas://${BUCKET_ID}/api-key" \
  --allow-unauthenticated
