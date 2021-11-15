# Application d'upload de fichier de données

Cette application a pour but de fournir un point d'entrée pour les métiers afin qu'ils puissent ajouter de la données dans les environnements d'analyse.

De cette manière l'ingestion des données ne passe plus par les data-scientistes.
Pour plus d'informations sur les usage, je vous invite à lire la [documentation suivante](documentation/USAGE.md)

## Développement
La configuration de développement est basée sur Docker et Docker-Compose.
Je vous invite à vous référer à [documentation/DOCKER.md](documentation/DOCKER.md) pour des informations concernant ces outils.

Plusieurs scripts sont intégrés dans le projet afin de pouvoir lancer l'application.
Vous pouvez les charger à l'aide de la commande `source scripts/dev/source.sh` ou les utiliser directement en appelant les script présent dans `scripts/dev`.

Dans un premier temps, vous devez démarrer l'application :
```sh
bash script/dev/start.sh
# OU
start
```

Il faut ensuite initialiser la base de données :
```sh
bash script/dev/reset.sh
# OU
initialize-db
```

Si vous avez de nouvelle dépendances dans votre `package.json` du dossier `backend` ou `frontend`, je vous invite à relancer la commande suivante :
```sh
bash script/dev/npm-install.sh
```
Cette commande doit aussi être lancé lors de la récupération du projet.

Après l'exécution de ces 2 (ou 3) commandes, vous devriez pouvoir accéder à l'interface depuis un navigateur à l'adresse [`http://localhost`](http://localhost).

Si vous souhaitez arrêter l'application, vous pouvez exécuter la commande suivante :
```sh
bash script/dev/stop.sh
# OU
stop
```

### Accès au log des dockers
Pour accéder aux logs d'un des dockers, vous pouvez utiliser la commande suivante :
```sh
bash script/dev/logs.sh <nom du service>
# OU
logs <nom du service>
```

Les noms de service possible sont :
- postgres
- backend
- frontend
- nginx-frontend

Vous pouvez aussi utiliser en plus l'option `-f` :
```sh
bash logs.sh -f <nom du service>
# OU
logs -f <nom du service>
```

Cette option permet de rafraîchir dynamiquement les logs afin de les visualiser en continue.

### Annexes
### postgresql
- Si vous avez déjà un postgresql qui tourne sur votre machine, les lignes 13-14 du fichier `docker-compose.override.dev.yml` sont commentés afin de ne pas entrer en conflit.

- Si vous n'en avez pas et que vous souhaitez accéder au serveur postgresql intégré dans ce projet depuis d'autres applications (e.g. IDE), veuillez décommenter ces lignes.
