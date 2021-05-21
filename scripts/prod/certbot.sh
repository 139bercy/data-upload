#!/usr/bin/env bash

eval $SCP_BASTION -r certificates/nginx.certbot.conf.template $BASTION_SERVER:./deploy/nginx.certbot.conf.template
eval $SCP_SERVER ./deploy/nginx.certbot.conf.template $FRONTEND_SERVER:./deploy/nginx.certbot.conf.template


eval $SSH_FRONTEND_SERVER docker volume create certificates_data

date=$(date +%s)
# Démarrage de mncpc-frontend
command="
set -x

# Arrêt des containers déjà existants sur la plate-forme
docker ps -q --filter \"name=certbot-nginx-\" | xargs --no-run-if-empty docker stop

############ TODO conserver le mncpc-frontend qui tourne pour le redémarrer
docker ps -q --filter \"name=mncpc-frontend-\" | xargs --no-run-if-empty docker stop

docker volume create certbot_challenge

# Démarrage d'un nginx pour résoudre le challenge de certbot et valider la génération du certificat
docker run -d --name certbot-nginx-${date} \
  --restart=unless-stopped \
  --network=host \
  -v /home/centos/deploy/nginx.certbot.conf.template:/etc/nginx/conf.d/certbot.conf.template \
  -v certbot_challenge:/var/www/html/.well-known/acme-challenge \
  -e SERVER_HOSTNAME=${SERVER_HOSTNAME} \
  nginx:1.19 bash -c \"ls /etc/nginx/conf.d/*;envsubst '$SERVER_HOSTNAME' < /etc/nginx/conf.d/certbot.conf.template > /etc/nginx/conf.d/default.conf ; nginx -g 'daemon off;'\"

# Démarrage de certbot pour générer le certificates
docker run --rm --name certbot-${date} \
  -v certificates_data:/etc/letsencrypt/ \
  -v certbot_challenge:/var/www/html/.well-known/acme-challenge \
  certbot/certbot certonly --webroot --webroot-path=/var/www/html --email erwan.daubert@finances.gouv.fr --agree-tos --no-eff-email --reinstall -d ${SERVER_HOSTNAME}

# Arrêt du nginx après génération du certificat
docker stop certbot-nginx-${date}
docker rm certbot-nginx-${date}

docker volume rm certbot_challenge

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
