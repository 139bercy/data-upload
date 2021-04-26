#!/usr/bin/env bash

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml run --rm backend npm install

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml run --rm frontend npm install