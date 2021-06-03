#!/usr/bin/env bash

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d postgres

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml run --rm postgress-initialisation

PORT=8080 RESET='true' docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d backend

sleep 5s

PORT=8080 RESET='true' docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml logs backend

PORT=8080 RESET='false' docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d backend
