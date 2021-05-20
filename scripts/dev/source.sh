#!/usr/bin/env bash

folder="scripts/dev"

function dc-dev () {
  USER_UID=$(id -g) docker-compose -f docker-compose.yml -f docker-compose.override.dev.yml $@
}
complete -F _docker_compose dc-dev

function start () {
  bash ${folder}/start.sh $@
}

function reset () {
  bash ${folder}/reset.sh $@
}

function stop () {
  bash ${folder}/stop.sh $@
}

function logs () {
  bash ${folder}/logs.sh $@
}

function run () {
  bash ${folder}/run.sh $@
}

function exec () {
  bash ${folder}/exec.sh $@
}
