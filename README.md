...existing code...
# TODO App

Pequeña aplicación TODO con backend en Node/Express + PostgreSQL y frontend estático servido por nginx. Contenido del repo y archivos clave:

- [docker-compose.yml](docker-compose.yml)
- [.gitignore](.gitignore)
- [.env](.env) (opcional, no incluido)
- backend/
  - [backend/Dockerfile](backend/Dockerfile)
  - [backend/.dockerignore](backend/.dockerignore)
  - [backend/package.json](backend/package.json)
  - [backend/src/index.js](backend/src/index.js) — servidor Express, registra el router [`tasksRouter`](backend/src/routes/task.js)
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

Comandos Docker Compose
```bash
# Construir imágenes 
docker-compose build 
# Levantar servicios 
docker-compose up -d 
# Ver logs de todos los servicios 
docker-compose logs -f 
# Ver logs de un servicio específico 
docker-compose logs -f backend 
# Detener servicios 
docker-compose down 
# Detener Y eliminar volúmenes 
docker-compose down -v 
# Ver estado de servicios 
docker-compose ps 
# Ejecutar comando en contenedor 
docker-compose exec backend sh

Arrancar con Docker (recomendado)

Construir y levantar servicios:
Frontend disponible en http://localhost:8080
Backend disponible en http://localhost:3000
PostgreSQL en el puerto 5432 (según docker-compose.yml)
Arrancar localmente (sin Docker)

Levantar PostgreSQL y crear base todo_db o ajustar variables de entorno.
En la carpeta backend:
npm install
npm run dev    # desarrollo con nodemon
# o
npm start      # producción

API (implementada en backend/src/routes/task.js)

GET /tasks — Lista de tareas.
POST /tasks — Crear tarea. Body JSON: { "title": "Nueva tarea" }
PUT /tasks/:id — Actualiza completed. Body JSON: { "completed": true }
DELETE /tasks/:id — Elimina tarea.
Nota importante

El frontend (frontend/app.js) usa PUT /tasks/:id/title para actualizar el título. Esa ruta no está implementada en backend/src/routes/task.js. Añadir un endpoint PUT /tasks/:id/title en task.js si se desea soporte para edición de títulos.
Base de datos
Esquema creado por initDB:
Tabla tasks con columnas: id SERIAL PRIMARY KEY, title TEXT NOT NULL, completed BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT now()
Contribuir

Abrir issues o enviar PR con mejoras. Mantener consistencia entre frontend y backend en los endpoints.
Licencia

Añadir archivo LICENSE según corresponda.