#!/usr/bin/env sh

set -e

envsubst '$SERVER_HOSTNAME $BACKEND_USERS $BACKEND_SERVICES $LISTEN $SSL_CERTIFICATE' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
cat /etc/nginx/nginx.conf
cat /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
