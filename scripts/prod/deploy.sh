#!/usr/bin/env bash

date=$(date +%s)
# Démarrage de backend
command="
set -x

docker volume create data_upload_data

# Arrêt des containers déjà existants sur la plate-forme
docker ps -q --filter \"name=data-upload-backend-\" | xargs --no-run-if-empty docker stop

docker run -d --name data-upload-backend-${date} \
  --restart=unless-stopped \
  -v data_upload_data:/storage \
  -p ${PORT}:${PORT} \
  -e RESET=false \
  -e DB_HOST=${PGHOST} \
  -e DB_NAME=${DB_NAME} \
  -e DB_USER=${DB_USER} \
  -e DB_PASSWORD=\"${DB_PASSWORD}\" \
  -e PORT=${PORT} \
  -e SECRET=\"${SECRET}\" \
  -e FILE_STORAGE=\"/storage\" \
  data-upload-backend:prod

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

# Arrêt des containers déjà existants sur la plate-forme
docker ps -q --filter \"name=data-upload-nginx-frontend-\" | xargs --no-run-if-empty docker stop

docker run -d --name data-upload-nginx-frontend-${date} \
  --restart=unless-stopped \
  --network=host \
  -p 80:80 \
  -p 443:443 \
  -e PORT=${PORT} \
  -e BACKEND_HOST=${BACKEND_HOST} \
  -e SERVER_HOSTNAME=${SERVER_HOSTNAME} \
  -e SSL_CERTIFICATE= \
  data-upload-nginx-frontend:prod

set +x
"

if [[ -z $SSH_FRONTEND_SERVER ]]
then
  eval "$command"
else
  eval $SSH_FRONTEND_SERVER <<EOF
    $command
EOF
fi
