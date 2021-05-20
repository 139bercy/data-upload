#!/usr/bin/env bash

arguments="$@"
if [[ -z "$arguments" ]]
then
  echo "Vous devez spécifier des paramètres. Ci-dessous quelques exemples :"
  echo "- $0 postgres psql"
  echo "- $0 mncpc-users sh"
  echo "- $0 mncpc-services sh"
  echo "- $0 mncpc-users sh"
  echo "- $0 mncpc-frontend npm install"
fi

# echo "USER_UID=$(id -g) docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml run --rm $arguments"
USER_UID=$(id -g) docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml run --rm $arguments
