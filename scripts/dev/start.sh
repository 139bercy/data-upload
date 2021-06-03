#!/usr/bin/env bash

PORT=8080 docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml up -d --build postgres backend frontend nginx-frontend
