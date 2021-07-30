# Application d'upload de fichier de données

Cette application a pour but de fournir un point d'entrée pour les métiers afin qu'ils puissent ajouter de la données dans les environnements d'analyse.

De cette manière l'ingestion des données ne passe plus par les data-scientistes.

## Installation de Docker sur Debian
### Désinstallation des anciennes version
`sudo apt-get remove docker docker-engine docker.io containerd runc`

### Installation en utilisant le répertoire
Avant d'installer Docker Engine pour la première fois sur une nouvelle machine, vous devez configurer le dossier Docker. Ensuite, vous pouvez installer et mettre à jour Docker à partir du dossier.
- Mise à jour des paquets
```sh
sudo apt-get update
```
```sh
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
- Ajout de clef GPG officiel de Docker
```sh
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
- Mise en place du référentiel stable
```sh
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```
###Docker Engine
```sh
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io
```
- vérification de l'installation
```sh
sudo docker run hello-world
```
### Retirer la commande sudo devant les commandes Docker
creation du groupe docker
```sh
sudo groupadd docker
```
Ajout de l'utilisateur dans le groupe docker
```sh
sudo usermod -aG docker $USER
```
Activation des changements du groupe
```sh
newgrp docker
```
Test pour vérifier que la commande sudo n'est plus nécessaire
```sh
docker run hello-world
```
- Démarrer Docker au démarrage de l'ordinateur
```sh
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```
### Docker compose installation
Téléchargement
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Changement des permissions
```sh
sudo chmod +x /usr/local/bin/docker-compose
```
Vérification de l'installation
```sh
docker-compose --version
```

Liens utiles :
- https://docs.docker.com/engine/install/debian/
- https://docs.docker.com/engine/install/linux-postinstall/
- https://docs.docker.com/compose/install/

Pour tout autres installation la documentation se retrouve sur le site de docker :
- https://docs.docker.com/get-docker/

Pour tout autres installation la documentation se retrouve sur le site de docker :
- https://docs.docker.com/get-docker/

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
bash npm-install.sh
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

Cette option permet de rafraîchir dynamiquement les logs afin de les visualiser en continue.

### Annexes
### postgresql
- Si vous avez déjà un postgresql qui tourne sur votre machine, les lignes 13-14 du fichier `docker-compose.override.dev.yml` sont commentés afin de ne pas entrer en conflit.

- Si vous n'en avez pas et que vous souhaitez accéder au serveur postgresql intégré dans ce projet depuis d'autres applications (e.g. IDE), veuillez décommenter ces lignes.
