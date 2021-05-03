#!/usr/bin/env bash

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d postgres

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml run postgress-initialisation

RESET='true' docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d backend
