#!/usr/bin/env bash

echo "Veuillez saisir l'adresse du site [http://localhost]"
read url
url=${url:-http://localhost}

echo "Veuillez saisir le nom d'utilisateur"
read user

echo "Veuillez saisir le mot de passe de l'utilisateur"
read password

echo "Veuillez saisir une description pour le token à créer"
read description

TOKEN="$(curl "${url}/api/auth/signin" -X POST -H 'Accept: application/json, text/plain, */*'--compressed -H 'Content-Type: application/json' --data-raw "{\"username\":\"${user}\",\"password\":\"${password}\"}" | jq -r '.accessToken')"

curl "${url}/api/tokens" -X POST -H 'Accept: application/json' --compressed -H "x-access-token: ${TOKEN}" --data "description=${description}"
echo
