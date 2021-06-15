#!/usr/bin/env bash

if [[ -z "$1" ]]
then
  parameters="postgres backend frontend nginx-frontend"
fi

PORT=8080 docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d --build $parameters
