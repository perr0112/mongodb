# ✏️ Le Carnet Gourmand - Frontend

Ceci est le client frontend de l'application Le Carnet Gourmand.

## ✨ Fonctionnalités
* **Interface Utilisateur Moderne** : Construite avec React, Vite et TypeScript pour une expérience utilisateur fluide et réactive.
* **Navigation** : Gestion des routes avec React Router.
* **Communication avec l'API** : Utilisation d'Axios pour les requêtes HTTP vers le backend.
* **Gestion de l'État** : Utilisation de l'API Context de React pour la gestion de l'état global (utilisateur).

## 🛠️ Installation

1. Installez les dépendances : `npm install`
2. Créez un fichier `.env` basé sur `.env.example`.
3. Lancer le serveur en mode développement :
   ```bash
   npm run dev
   ```
4. Assurez-vous que le backend est également en cours d'exécution pour que l'application fonctionne correctement.

Vous pourrez ainsi accéder à l'application frontend à l'adresse `http://localhost:5173/`.

Voici un tableau de deux utilisateurs connus, insérés dans la base de données :
| Email               | Mot de passe | Rôle      |
|---------------------|--------------|-----------|
| admin@lcg-dev.com   | admin123     | admin     |
| user@lcg-dev.com    | user123      | utilisateur|