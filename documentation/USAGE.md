# Description des usages de Data Upload

L'objectif de Data-Upload est de fournir un outil permettant aux utilisateurs d'uploader des fichiers qui seront ensuite traités automatiquement pour les intégrer dans un système de données.

Notre première version utilise [PyPEL](https://github.com/139bercy/pypel) comme ETL et [Orchestrator-ETL](https://github.com/139bercy/orchestrator-ETL) comme outil d'orchestration des différents services.
Cette version est relativement simple et ne permet pas de gérer tous les cas d'usage.
Il impose notamment une proximité physique (sur la même machine) entre le service backend de Data-Upload et le service Orchestrator-ETL afin de partager un volume qui contient les données uploadées.
Il est possible d'éviter cette contrainte en utilisant un système de volume partagé entre machine par exemple mais ce sujet n'est pas abordé ici.

## Gestion des comptes
**TODO**

## Gestion des indexes
**TODO**

## Upload de données
### Upload de données au travers d'une interface Web

### Upload de données au travers d'une API web
