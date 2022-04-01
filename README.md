# Programmation Web 3 | Coffre fort pour fichier

Autheur: Benjamin Niddam
<br>
Date: 31-03-2022

---

## Présentation

**Consigne**: Réaliser un site web qui permet de stocker un fichier sur un serveur. Pour cela, l'utilisateur devra se créer un compte et/ou se connecter. Pour ce faire, on mettra en place une base de données mysql qui contiendra les informations sur les utilisateurs.

<br>

**Réalisation**: Afin de réaliser ce projet, j'ai utilisé node.js, express.js, mysql (mariadb pour la mise en production sur mon serveur linux), et la librairie Sequelize pour la gestion de la base de données. Par la suite j'ai ajouté un service-worker et un manifest pour le site web afin d'en faire une PWA (progressive web app) et de pouvoir l'installer.

<br>

Ce programme utilise le modèle mvc et se présente comme suit:

```
--- Vues
------ index.html

--- Modeles
------ user.model.js

--- Controlleurs
------ login.controller.js
------ register.controller.js
------ submitDocument.controller.js
```

Chaque controlleur est appellé par une requête http spécifique et utilise le JSON pour communiquer avec le client.

```js
"/register" => register
send
{
    "method": "POST",
    "body": {
        login,   // string: identifiant de l'utilisateur
        password // string: mot de passe de l'utilisateur
    }
}

receive
{
    success, // boolean: "true" si l'utilisateur a été créé
    message, // string: message d'échec ou de succès à afficher
    user     // objet: l'utilisateur créé
}

"/login" => login
{
    "method": "POST",
    "body": {
        login,   // string: identifiant de l'utilisateur
        password // string: mot de passe de l'utilisateur
    }
}

receive
{
    success, // boolean: "true" si le login et le mot de passe sont corrects
    message, // string: message d'échec ou de succès à afficher
    user     // objet: l'utilisateur connecté
}

"/submit-doc" => submitDocument
{
    "method": "POST",
    "body": {
        userId,  // int: id de l'utilisateur
        document // file: fichier à stocker
    }
}

receive
{
    success,     // boolean: "true" si le fichier a été stocké
    message,     // string: message d'échec ou de succès à afficher
    documentPath // string: chemin du fichier stocké
}

```

## Résultats

Le site web est accessible à l'adresse: https://coffre-fort.benjamin-niddam.dev
