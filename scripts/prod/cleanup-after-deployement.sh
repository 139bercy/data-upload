#!/usr/bin/env bash


# Démarrage de backend
command="
set -x

docker ps -a --filter \"name=data-upload-backend-\" --filter \"status=exited\" --format \"{{ .Names }}\" | xargs --no-run-if-empty docker rm

set +x
"

if [[ -z $SSH_BACKEND_SERVER ]]
then
  eval "$command"
else
  eval $SSH_BACKEND_SERVER <<EOF
    $command
EOF
fi

# Démarrage de frontend
command="
set -x

docker ps -a --filter \"name=data-upload-nginx-frontend-\" --filter \"status=exited\" --format \"{{ .Names }}\" | xargs --no-run-if-empty docker rm

set +x
"

if [[ -z $SSH_FRONTEND_SERVER ]]
then
  eval "$command"
else
  eval $SSH_BACKEND_SERVER <<EOF
    $command
EOF
fi
