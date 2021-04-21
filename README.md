# Application d'upload de fichier de données

Cette application a pour but de fournir un point d'entrée pour les métiers afin qu'ils puissent ajouter de la données dans les environnements d'analyse.

De cette manière l'ingestion des données ne passe plus par les datascientists.

## Installation de Docker sur Debian
### Désinstallation des anciennes version
`sudo apt-get remove docker docker-engine docker.io containerd runc`

### Installation en utilisant le répertoire
Avant d'installer Docker Engine pour la première fois sur une nouvelle machine, vous devez configurer le dossier Docker. Ensuite, vous pouvez installer et mettre à jour Docker à partir du dossier.
- Mise à jour des paquets
```SH
sudo apt-get update
```
```SH
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
- Ajout de clef GPG officiel de Docker
```shell
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
- Mise en place du référentiel stable
```shell
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```
###Docker Engine
```shell
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io
```
- vérification de l'installation 
```shell
sudo docker run hello-world
```
### Retirer la commande sudo devant les commandes Docker
creation du groupe docker
```shell
sudo groupadd docker
```
Ajout de l'utilisateur dans le groupe docker
```shell
sudo usermod -aG docker $USER
```
Activation des changements du groupe
```shell
newgrp docker
```
Test pour vérifier que la commande sudo n'est plus nécessaire
```shell
docker run hello-world
```
- Démarrer Docker au démarrage de l'ordinateur
```shell
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```
### Docker compose installation
Téléchargement
```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Changement des permissions
```shell
sudo chmod +x /usr/local/bin/docker-compose
```xxœ
Vérification de l'installation
```shell
docker-compose --version
```

Liens utiles :
- https://docs.docker.com/engine/install/debian/
- https://docs.docker.com/engine/install/linux-postinstall/
- https://docs.docker.com/compose/install/

## Développement

Plusieurs scripts sont intégrés dans le projet afin de pouvoir lancer l'application.

Dans un premier temps, vous devez démarrer l'application :
```sh
bash start.sh
```

Il faut ensuite initialiser la base de données :
```sh
bash reset.sh
```

Si vous avez de nouvelle dépendances dans votre `package.json` du dossier `backend` ou `frontend`, je vous invite à relancer la commande suivante :
```sh
bash install-dependencies.sh
```
Cette commande doit aussi être lancé lors de la récupération du projet.

Après l'exécution de ces 2 (ou 3) commandes, vous devriez pouvoir accéder à l'interface depuis un navigateur à l'adresse [`http://localhost`](http://localhost).

Si vous souhaitez arrêter l'application, vous pouvez exécuter la commande suivante :
```sh
bash stop.sh
```

### Accès au log des dockers
Pour accéder aux logs d'un des dockers, vous pouvez utiliser la commande suivante :
```sh
bash logs.sh <nom du service>
```

Les noms de service possible sont :
- postgres
- backend
- frontend
- nginx-frontend

Vous pouvez aussi utiliser en plus l'option `-f` :
```sh
bash logs.sh -f <nom du service>
```

Cette option permet de rafraichir dynamiquement les logs afin de les visualiser en continue.
