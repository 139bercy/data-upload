#!/usr/bin/env bash

set -x -e

mkdir deploy || true

# Construction des images
docker-compose -f docker-compose.yml build

# Suppression des images déjà existantes
rm -rf deploy/postgres.tar
rm -rf deploy/data-upload-backend.tar
rm -rf deploy/data-upload-nginx-frontend.tar

# Save des images
docker save postgres:13-alpine -o deploy/postgres.tar
docker save data-upload-backend:prod -o deploy/data-upload-backend.tar
docker save data-upload-nginx-frontend:prod -o deploy/data-upload-nginx-frontend.tar
