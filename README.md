# Getting Started

#### Server

- Move to server folder from project root directory.

```http
  cd Server
```

- Create a .env file and populate it with keys from the .env.sample file.
- Create table in mysql matching with `Database` name provided with .env file, after which run the following commands.

```http
  npm install
```

```http
  npm run migrate
```

```http
  npm start
```

Runs the app in the development mode.

#### Client

- Move to client folder from project root directory.

```http
  cd Client
```

- Create a .env file and populate it with keys from the .env.sample file.
- now run the following commands.

```http
  npm install
```

```http
  npm run dev
```

Runs the app in the development mode.

Now you can use the application. Usually the project runs on http://localhost:5173.
