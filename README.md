# Application d'upload de fichier de données

Cette application a pour but de fournir un point d'entrée pour les métiers afin qu'ils puissent ajouter de la données dans les environnements d'analyse.

De cette manière l'ingestion des données ne passe plus par les datascientists.

## Installation
TODO

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
