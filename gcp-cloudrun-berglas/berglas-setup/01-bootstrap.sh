#!/usr/bin/env bash

# set up envs
PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
export PROJECT_ID
export BUCKET_ID=berglas-secrets-${PROJECT_ID}

# enable apis
gcloud services enable --project "${PROJECT_ID}" \
  cloudkms.googleapis.com \
  storage-api.googleapis.com \
  storage-component.googleapis.com

# dl and run berglas setup
docker pull gcr.io/berglas/berglas:latest
docker run gcr.io/berglas/berglas bootstrap --project "$PROJECT_ID" --bucket "$BUCKET_ID"

# turn on auditing - optional, but really why wouldn't you
#
# get currnet policy
gcloud projects get-iam-policy "${PROJECT_ID}" > policy.yaml

# append new policy
cat <<EOF >> policy.yaml
auditConfigs:
- auditLogConfigs:
  - logType: DATA_READ
  - logType: ADMIN_READ
  - logType: DATA_WRITE
  service: cloudkms.googleapis.com
- auditLogConfigs:
  - logType: ADMIN_READ
  - logType: DATA_READ
  - logType: DATA_WRITE
  service: storage.googleapis.com
EOF

# apply new policy
gcloud projects set-iam-policy "${PROJECT_ID}" policy.yaml

# remove the local copy of the policy
rm policy.yaml
