# TODO App

Pequeña aplicación TODO con backend en Node/Express + PostgreSQL y frontend estático servido por nginx. Contenido del repo y archivos clave:

- [docker-compose.yml](docker-compose.yml)
- [.gitignore](.gitignore)
- [.env](.env) (opcional, no incluido)
- backend/
  - [backend/Dockerfile](backend/Dockerfile)
  - [backend/.dockerignore](backend/.dockerignore)
  - [backend/package.json](backend/package.json)
  - [backend/src/index.js](backend/src/index.js) — servidor Express, registra el router [`tasksRouter`](backend/src/index.js)
  - [backend/src/db.js](backend/src/db.js) — conexión a PostgreSQL, exporta [`pool`](backend/src/db.js) y [`initDB`](backend/src/db.js)
  - [backend/src/routes/task.js](backend/src/routes/task.js) — rutas REST para tareas (GET, POST, PUT toggle, DELETE)
- frontend/
  - [frontend/Dockerfile](frontend/Dockerfile)
  - [frontend/nginx.conf](frontend/nginx.conf)
  - [frontend/index.html](frontend/index.html)
  - [frontend/app.js](frontend/app.js) — cliente que consume la API
  - [frontend/styles.css](frontend/styles.css)
- docs/ (vacío o documentación adicional)

Requisitos
- Docker & Docker Compose (recomendado)
- Alternativa: Node.js 18+ y una instancia PostgreSQL (local o remota)

Arrancar con Docker (recomendado)
1. Construir y levantar servicios:
   ```sh
   docker-compose up --build