# Le Carnet Gourmand

![Le Carnet Gourmand](docs/assets/cover.png)

Le Carnet Gourmand est un blog de recettes culinaires. Il permet de créer, partager et découvrir des recettes de cuisine variées tout en ayant accès à des fonctionnalités sociales telles que les commentaires et les évaluations.

Ce projet est réalisé dans le cadre du module **FRAMEWORK JS** animé par Monsieur Addi.

## Fonctionnalités disponibles

- [x] Création de compte utilisateur
- [x] Gestion de profil
- [x] Authentification sécurisée
- [x] Création et gestion de recettes
- [x] Catégorisation des recettes
- [x] Système de commentaires et d'évaluations
- [x] Recherche avancée de recettes

## 🚀 Aperçu du Projet
Le projet est divisé en deux parties principales :
* **Frontend** : Interface utilisateur moderne construite avec React, Vite et TypeScript.
* **Backend** : API REST robuste utilisant Express, MongoDB (Mongoose) et documentée avec Swagger.

## 🛠️ Stack Technique
* **Front** : React, React Router, Axios, TypeScript, Vite.
* **Back** : Node.js, Express, MongoDB, JWT (Auth), MongoDB (Mongoose) et .

## 📦 Installation et Lancement Rapide

1. **Cloner le dépôt** :
```bash
   git clone [https://github.com/votre-compte/le-carnet-gourmand.git](https://github.com/votre-compte/le-carnet-gourmand.git)
   cd le-carnet-gourmand
```
2. **Installer les dépendances** pour le frontend et le backend :
```bash
   cd frontend
   npm install
   cd ../backend
   npm install
```
3. **Configurer les variables d'environnement** :
    - Créez un fichier `.env` dans les dossiers `backend` et `frontend` en vous basant sur le fichier `.env.example` et remplissez vos accès MongoDB, secret JWT et autres variables nécessaires.

4. **Lancer les serveurs** :
```bash
    # Dans un terminal, lancez le backend
    cd backend
    npm run dev
    # Dans un autre terminal, lancez le frontend
    cd ../frontend
    npm run dev
``` 

Pour des informations détaillées sur chaque partie, consultez les README respectifs dans les dossiers `frontend` et `backend`.
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.
