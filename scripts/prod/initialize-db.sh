#!/usr/bin/env bash

# Démarrage de la base de données
command="
set -x

docker volume create data_upload_postgres_data

docker run -d --name data-upload-postgres \
  --restart=unless-stopped \
  --network=host \
  -e POSTGRES_PASSWORD=${PGPASSWORD} \
  -e POSTGRES_USER=${PGUSER} \
  -e PGUSER=${PGUSER} \
  -e PGPASSWORD=\"${PGPASSWORD}\" \
  --health-cmd 'pg_isready' \
  --health-interval 10s \
  --health-retries 5 \
  --health-start-period 10s \
  --health-timeout 5s \
  -v data_upload_postgres_data:/var/lib/postgresql/data \
  postgres:13-alpine

sleep 10s

# Initialization de la base de données SEULEMENT SI ELLE N'EXISTE PAS !!
docker exec data-upload-postgres bash -c \"psql -c \\\"CREATE USER ${DB_USER} WITH SUPERUSER NOCREATEDB NOCREATEROLE PASSWORD '${DB_PASSWORD}'\\\" && psql -c \\\"CREATE DATABASE ${DB_NAME} OWNER=${DB_USER} ENCODING='utf-8'\\\"\"

set +x
"

if [[ -z $SSH_BASE_SERVER ]]
then
  eval "$command"
else
  eval $SSH_BASE_SERVER <<EOF
    $command
EOF
fi

# Initialization de la base pour backend
command="
set -x

docker run -d --name data-upload-backend-init-db \
  --restart=unless-stopped \
  --network=host \
  -e RESET=true \
  -e DB_HOST=${PGHOST} \
  -e DB_NAME=${DB_NAME} \
  -e DB_USER=${DB_USER} \
  -e DB_PASSWORD=\"${DB_PASSWORD}\" \
  -e PORT=${PORT} \
  -e SECRET=\"${SECRET}\" \
  -e ADMIN_USERNAME=${ADMIN_USERNAME} \
  -e ADMIN_PASSWORD=\"${ADMIN_PASSWORD}\" \
  -e ADMIN_EMAIL=${ADMIN_EMAIL} \
  data-upload-backend:prod

sleep 5s

docker logs data-upload-backend-init-db

docker stop data-upload-backend-init-db
docker rm data-upload-backend-init-db

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

# Initialization de mailhog comme une alternative **temporaire** à l'absence de SMTP accessible
commnad="
docker run -d --name data-upload-mailhog \
  --restart=unless-stopped \
  --network=host \
  mailhog/mailhog
"

if [[ -z $SSH_BACKEND_SERVER ]]
then
  eval "$command"
else
  eval $SSH_BACKEND_SERVER <<EOF
    $command
EOF
fi
