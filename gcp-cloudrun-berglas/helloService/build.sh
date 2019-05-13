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

gcloud builds submit \
  --project "${PROJECT_ID}" \
  --tag "gcr.io/${PROJECT_ID}/berglas-example-node:${PACKAGE_VERSION}" \
  .