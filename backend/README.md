# ⚙️ Le Carnet Gourmand - API

Ceci est le serveur backend de l'application Le Carnet Gourmand.

## ✨ Fonctionnalités
* **Authentification** : Gestion des utilisateurs avec JWT et cookies.
* **Sécurité** : Protection contre les injections NoSQL, limitation de débit (rate-limiting) et headers sécurisés avec Helmet.
* **Documentation** : API documentée via Swagger.
* **Fixtures** : Script de génération de données factices avec Faker.js.

## 🛠️ Installation

1. Installez les dépendances : `npm install`
2. Créez un fichier `.env` basé sur `.env.example` et remplissez vos accès MongoDB et secret JWT.
3. Lancer la base de données et l'interface (n'oubliez pas d'ouvrir Docker Desktop ou un autre gestionnaire Docker) :
   ```bash
   docker-compose up -d
   ```
4. Générez des données de test :
   ```bash
   npm run fixtures
   ```
5. Démarrez le serveur en mode développement :
   ```bash
   npm run dev
   ```

Vous aurez ainsi accès à l'API à l'adresse `http://localhost:4321/` et à la documentation Swagger `http://localhost:3000/api-docs/`.
