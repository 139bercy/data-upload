#!/usr/bin/env bash


# Nettoyage de backend
command="
set -x

docker ps -a --filter \"name=data-upload-backend-\" --format \"{{ .Names}}\" | sort -u | tail -1 | xargs --no-run-if-empty docker stop
docker ps -a --filter \"name=data-upload-backend-\" --format \"{{ .Names}}\" | sort -u | tail -2 | head -1 | xargs --no-run-if-empty docker start

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

# # Nettoyage de frontend
command="
set -x

docker ps -a --filter \"name=data-upload-nginx-frontend-\" --format \"{{ .Names}}\" | sort -u | tail -1 | xargs --no-run-if-empty docker stop
docker ps -a --filter \"name=data-upload-nginx-frontend-\" --format \"{{ .Names}}\" | sort -u | tail -2 | head -1 | xargs --no-run-if-empty docker start

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
