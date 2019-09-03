<div align="center">

# Easy Cloud Build Community Builders

> Easily define and build you community sourced images

<!-- img goes here -->

</div>

Cloud Build is the GCP native CI/CD platform. It's a simple yet powerful product. You define a trigger and some steps to execute once the trigger conditions are met. Each step defines a GCR or DockerHub URL to fetch a Docker image which is used as the execution environment for that step.

GCP provide some images out of the box (Link) for you to use, but there is also a great list of community contributed images for you to choose from. Unfortunately the community builders are not contained in a container registry. The recommended path is to build the images yourself and push them to your GCP project's Container Registry.

The guides for this recommend doing this from your local machine or the Cloud Console Cloud Shell. This is the method I use and for more consistent:


TODO

```yaml
steps:
  - name: gcr.io/cloud-builders/git
    id: 'community cloud builders: clone'
    waitFor:
      - '-'
    args:
      - 'clone'
      - 'https://github.com/GoogleCloudPlatform/cloud-builders-community'

  # Cache
  - name: gcr.io/cloud-builders/gcloud
    id: 'save_restore_cache: build builder'
    waitFor:
      - 'community cloud builders: clone'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        cd cloud-builders-community/cache \
        && gcloud builds submit --config cloudbuild.yaml . \
        && gcloud container images list --filter cache

  # Firebase
  - name: gcr.io/cloud-builders/gcloud
    id: 'save_restore_cache: build builder'
    waitFor:
      - 'community cloud builders: clone'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        cd cloud-builders-community/firebase \
        && gcloud builds submit --config cloudbuild.yaml . \
        && gcloud container images list --filter firebase
```

# Cloud Build Create Trigger API

# URL: https://cloud.google.com/cloud-build/docs/api/reference/rest/v1/projects.triggers/create

```json
{
  "name": "Build Custom or Community CB Builder Images",
  "filename": ".ci/builders.cloudbuild.yaml",
  "triggerTemplate": {
    "branchName": ".*",
    "repoName": "<CLOUD_SOURCE_REPO_NAME>"
  },
  "includedFiles": [".ci/builders.cloudbuild.yaml"]
}
```

https://github.com/GoogleCloudPlatform/cloud-builders-community
