#!/usr/bin/env bash

. $(dirname $0)/configure-variables.sh


# echo "Do we need to create new encryption keys ? [y/n]"
# read go
# if [[ "$go" != "y" ]]
# then
#   echo "We assume the encryption keys you want to use are on ./deploy/jwt-keys"
#   echo "If not please copy them there"
#   echo "Press enter if OK or CTRL-C if not to cancel"
#   read
# else
#   # Création des clés de chiffrement + Création du certificat lets encrypt
#   mkdir -p deploy/jwt-keys || true
#   bash scripts/generate-keys.sh "./deploy/jwt-keys"
# fi
#
# echo ""
# go=n

echo "Do we need to build the images ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/build.sh
fi

echo ""
go=n

echo "Do you need to upload the images and the certificates (encryption key and SSL) ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/upload-configuration.sh
fi

echo ""
go=n
echo "Is it the first time you deploy and so the database should be initialized ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/initialize-db.sh
fi

echo ""
go=n
echo "Do you want to generate Let's encrypt certificates ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/certbot.sh
fi

echo ""
go=n

echo "Are you ready to deploy ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/deploy.sh
fi

echo ""
go=n

echo "Do you want to rollback the deployement ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/rollback-deployement.sh
fi

echo ""
go=n

echo "Do you want to clean up after the deployement ? [y/n]"
read go
if [[ "$go" == "y" ]]
then
  bash $(dirname $0)/cleanup-after-deployement.sh
fi
