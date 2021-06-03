#!/usr/bin/env bash

if [[ ! -z "$1" ]]
then
  DIR="$1"
else
  DIR="certificates"
fi

openssl ecparam -name prime256v1 -genkey -noout -out $DIR/ecdsa_private_key.pem.ec
openssl ec -in $DIR/ecdsa_private_key.pem.ec -pubout -out $DIR/ecdsa_public_key.pem
openssl pkcs8 -topk8 -inform pem -in $DIR/ecdsa_private_key.pem.ec -outform pem -nocrypt -out $DIR/ecdsa_private_key.pem
