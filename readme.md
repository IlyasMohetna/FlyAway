# **FlyAway** : Projet de gestion d'agence de voyages

---

## Guide d'installation

### **Pré-requis**

Assurez-vous que les éléments suivants sont installés sur votre système :

-   PHP >= 7.3
-   Composer
-   Node.js & npm/yarn
-   MySQL ou tout autre système de base de données pris en charge

---

### **Étapes d'installation**

1. **Cloner le dépôt :**

    ```bash
    git clone https://github.com/IlyasMohetna/FlyAway.git
    cd FlyAway
    ```

2. **Créer une nouvelle base de données MySQL :**

    - Ouvrez votre client MySQL ou outil GUI.
    - Exécutez la commande suivante pour créer une base de données :
        ```sql
        CREATE DATABASE flyaway;
        ```

3. **Configurer les variables d'environnement :**

    - Ouvrez le fichier `.env` et mettez à jour les champs suivants avec vos informations de base de données :
        ```env
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=flyaway
        DB_USERNAME=votre_nom_utilisateur
        DB_PASSWORD=votre_mot_de_passe
        ```

4. **Installer les dépendances PHP :**

    ```bash
    composer install
    ```

5. **Installer les dépendances JavaScript :**

    ```bash
    npm install
    ```

6. **Générer la clé de l'application :**

    ```bash
    php artisan key:generate
    ```

7. **Exécuter les migrations de la base de données :**

    ```bash
    php artisan migrate:all
    ```

8. **Exécuter les seeders pour remplir la base de données (optionnel) :**

    ```bash
    php artisan db:seed
    ```

9. **Créer un lien symbolique pour le stockage :**

    ```bash
    php artisan storage:link
    ```

10. **Compiler les assets :**

    ```bash
    npm run dev
    ```

11. **Lancer le serveur de développement :**

    ```bash
    php artisan serve --port=2024
    ```

---

## **Liens pour tester l'application**

-   **Dashboard client** : [http://localhost:2024/client/login](http://localhost:2024/client/login)
-   **Dashboard admin** : [http://localhost:2024/admin/login](http://localhost:2024/admin/login)
-   **Recherche** : [http://localhost:2024/package/search](http://localhost:2024/package/search)

---

## **Identifiants par défaut**

### **Admin :**

-   Email : `admin@test.com`
-   Mot de passe : `12345678`

Pour se connecter comme administrateur avec d'autres comptes, utilisez un email d'administrateur trouvé dans la base de données et le mot de passe associé.

### **Client :**

-   Email : Sur la table `users`
-   Mot de passe pour tous les comptes clients : `password`

---

## **Erreurs courantes et dépannage**

### **Erreur de connexion à la base de données :**

-   **Message :** `SQLSTATE[HY000] [1045] Access denied for user`
-   **Solution :** Vérifiez les identifiants de connexion dans le fichier `.env`. Assurez-vous que le service MySQL est en cours d'exécution et accessible.

---

## **Ressources supplémentaires**

-   [Documentation Laravel](https://laravel.com/docs)
-   [Documentation Composer](https://getcomposer.org/doc/)
-   [Documentation Node.js](https://nodejs.org/en/docs/)

---
