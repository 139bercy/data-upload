#!/usr/bin/env bash

PGPASSWORD=admin PGUSER=admin DB_USER="data_upload" DB_PASSWORD="data_upload" DB_NAME="data_upload" PGHOST=postgres PORT=8080 docker-compose -f docker-compose.yml run --rm postgress-initialisation

   # SERVER_HOSTNAME=localhost BACKEND_HOST="backend:8080" PGHOST='postgres' PGUSER="data_upload" PGPASSWORD="data_upload" PGDATABASE="data_upload"

RESET=true ADMIN_USERNAME='admin' ADMIN_EMAIL='admin@admin.admin' ADMIN_PASSWORD='admin' SECRET='my-secret' PORT=8080 PGHOST=postgres DB_USER="data_upload" DB_PASSWORD="data_upload" DB_NAME="data_upload" docker-compose -f docker-compose.yml up -d --build postgres backend

sleep 5s

RESET=false SECRET='my-secret' PORT=8080 PGHOST=postgres DB_USER="data_upload" DB_PASSWORD="data_upload" DB_NAME="data_upload" BACKEND_HOST="backend:8080" SERVER_HOSTNAME=localhost docker-compose -f docker-compose.yml up -d --build postgres backend nginx-frontend
