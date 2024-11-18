# FlyAway

**FlyAway** (Mondeo): A project for managing a travel agency.

---

## Installation Guide

### Prerequisites

Ensure the following are installed on your system:

-   PHP >= 7.3
-   Composer
-   Node.js & npm/yarn
-   MySQL or any other supported database

---

### Installation Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/IlyasMohetna/FlyAway.git
    cd FlyAway
    ```

2. **Create a new database in MySQL**:

    - Open your MySQL client or GUI tool.
    - Run the following command to create a new database:
        ```sql
        CREATE DATABASE flyaway;
        ```

3. **Configure environment variables**:

    - Copy the `.env.example` file to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Open the `.env` file and update the following fields with your database details:
        ```env
        DB_CONNECTION=mysql --> Modify to adpat to your database
        DB_HOST=127.0.0.1 --> Modify to adpat to your database
        DB_PORT=3306 --> Modify to adpat to your database
        DB_DATABASE=flyaway --> Modify to adpat to your database
        DB_USERNAME=flyaway_user --> Modify to adpat to your database
        DB_PASSWORD=securepassword --> Modify to adpat to your database
        ```

4. **Install PHP dependencies**:

    ```bash
    composer install
    ```

5. **Install JavaScript dependencies**:

    ```bash
    npm install
    ```

6. **Generate the application key**:

    ```bash
    php artisan key:generate
    ```

7. **Run database migrations**:

    ```bash
    php artisan migrate
    ```

8. **Run database seeders (if available)**:

    ```bash
    php artisan db:seed
    ```

9. **Create a symbolic link for storage**:

    ```bash
    php artisan storage:link
    ```

10. **Compile the assets**:
    npm run dev

    ```

    ```

11. **Start the development server**:
    ```bash
    php artisan serve
    ```

---

## Common Errors and Troubleshooting

### Error during migrations:

-   **Message**: `Migration failed for: [folder]`
-   **Solution**: Ensure that your database is properly configured in the `.env` file. Check for syntax errors or missing configurations in your migration files.

### Error during `npm install`:

-   **Message**: `npm ERR! code ELIFECYCLE`
-   **Solution**: Ensure that you have the correct version of Node.js and npm/yarn installed. Delete the `node_modules` folder and run the install command again.

### Error while running artisan commands:

-   **Message**: `Class [class-name] not found`
-   **Solution**: Ensure that the class exists and is correctly namespaced. Run `composer dump-autoload` to refresh the autoloader.

### Error during asset compilation:

-   **Message**: `Module build failed`
-   **Solution**: Ensure that all dependencies are correctly installed. Check for errors in your `webpack` or build configuration files.

### General application error:

-   **Message**: `Une erreur est survenue !`
-   **Solution**: Check the application logs in `storage/logs/laravel.log` for detailed error messages. Ensure that the environment is correctly set in the `.env` file.

### Database connection error:

-   **Message**: `SQLSTATE[HY000] [1045] Access denied for user`
-   **Solution**: Verify your database credentials in the `.env` file. Ensure that the MySQL service is running and accessible.

---

## Additional Resources

-   [Laravel Documentation](https://laravel.com/docs)
-   [Composer Documentation](https://getcomposer.org/doc/)
-   [Node.js Documentation](https://nodejs.org/en/docs/)

If you encounter issues not covered in this guide, please refer to the issue tracker or submit a new issue.
