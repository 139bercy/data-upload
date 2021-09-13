
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
