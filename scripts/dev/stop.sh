#!/usr/bin/env bash

docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml down $@
