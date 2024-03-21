## Laravel

This app is built with Laravel. Look at the [Laravel documentation](https://laravel.com/docs/11.x) to learn more.

## Prerequisite

- PHP 8.2
- Node 20
- MySQL 5.7

## Usage

First, copy `.env.example` to `.env`. Specify the content to suit your environments.

```
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

Then run these commands.

```
composer install
php artisan migrate
npm install
npm run build

php artisan serve --port=8000
```

The app should be running on `http://localhost:8000`.
