#!/usr/bin/env bash

# Copie des images par SSH vers le bastion
eval $SSH_BASTION mkdir -p deploy/jwt-keys 2> /dev/null || true
eval $SSH_BACKEND_SERVER mkdir -p deploy/jwt-keys 2> /dev/null || true
eval $SSH_FRONTEND_SERVER mkdir -p deploy/jwt-keys 2> /dev/null || true
eval $SCP_BASTION deploy $BASTION_SERVER

# copie des images sur chacun des serveurs
eval $SCP_SERVER ./deploy/postgres.tar $BASE_SERVER:./deploy/
eval $SCP_SERVER ./deploy/data-upload-backend.tar $BACKEND_SERVER:./deploy/
eval $SCP_SERVER ./deploy/data-upload-nginx-frontend.tar $FRONTEND_SERVER:./deploy/

# Copie des certificats et clé de chiffrement
# eval $SCP_SERVER -r ./deploy/jwt-keys/* $BACKEND_SERVER:./deploy/jwt-keys/
# eval $SCP_SERVER -r ./deploy/jwt-keys/* $SERVICES_SERVER:./deploy/jwt-keys/
# eval $SCP_SERVER -r ./deploy/jwt-keys/* $FRONTEND_SERVER:./deploy/jwt-keys/

# Load des images
eval $SSH_BASE_SERVER docker load -i ./deploy/postgres.tar
eval $SSH_BACKEND_SERVER docker load -i ./deploy/data-upload-backend.tar
eval $SSH_FRONTEND_SERVER docker load -i ./deploy/data-upload-nginx-frontend.tar


# Création des volumes sur chaque serveurs
eval $SSH_BASE_SERVER docker volume create postgres_data
eval $SSH_BACKEND_SERVER docker volume create certificates_data
eval $SSH_FRONTEND_SERVER docker volume create certificates_data

# Copie des certificats et des clés de chiffrement dans le volume correspondant sur les différents serveurs
date_container="$(date +%s)"
eval $SSH_BACKEND_SERVER docker run -d --name dummy-${date_container} -v certificates_data:/src/certificates busybox
eval $SSH_BACKEND_SERVER docker cp ./deploy/jwt-keys/ dummy-${date_container}:/src/certificates
eval $SSH_BACKEND_SERVER docker stop dummy-${date_container}
eval $SSH_BACKEND_SERVER docker rm dummy-${date_container}

eval $SSH_FRONTEND_SERVER docker run -d --name dummy-${date_container} -v certificates_data:/src/certificates busybox
eval $SSH_FRONTEND_SERVER docker cp ./deploy/jwt-keys/ dummy-${date_container}:/src/certificates
eval $SSH_FRONTEND_SERVER docker stop dummy-${date_container}
eval $SSH_FRONTEND_SERVER docker rm dummy-${date_container}
