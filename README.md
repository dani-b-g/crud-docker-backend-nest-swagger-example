# Backend NestJS: CRUD Productos + JWT + Mongo + Swagger + MinIO

Proyecto base para examen: API backend con autenticación JWT, usuarios, CRUD de productos, subida de imágenes a MinIO y documentación Swagger.

## ¿Qué debe hacer el alumno?
El stack backend + base de datos ya está preparado. El alumno debe:
1. Construir su propio frontend.
2. Dockerizar su frontend.
3. Conectarlo al backend publicado en `http://localhost:3000` desde su contenedor/frontend.

## Requisitos
- Docker y Docker Compose

## Arranque rápido (profesor)
1. Copia variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Levanta servicios:
   ```bash
   docker compose up --build
   ```
3. API: `http://localhost:3000`
4. Swagger: `http://localhost:3000/docs`
5. Healthcheck: `http://localhost:3000/health`
6. Consola MinIO: `http://localhost:9001` (user/pass: `minioadmin`)

## Endpoints principales
### Auth
- `POST /auth/register`
- `POST /auth/login`

### Products (requiere Bearer Token)
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `POST /products/:id/images` (multipart/form-data, campo `image`)
- `DELETE /products/:id`

## CORS para frontend del alumno
- Configura `FRONTEND_URL` en `.env`.
- Puedes indicar uno o varios orígenes separados por coma.
  - Ejemplo: `FRONTEND_URL=http://localhost:5173,http://localhost:4173`

## Ejemplo de `docker-compose` del alumno
Ejemplo mínimo para que el frontend consuma el backend expuesto en localhost:

```yaml
services:
  frontend:
    build: .
    container_name: alumno_frontend
    ports:
      - '5173:80'
    environment:
      - VITE_API_URL=http://host.docker.internal:3000
```

> Nota: `host.docker.internal` permite que el contenedor del frontend alcance el backend publicado en el host (`localhost:3000`).

## Flujo recomendado para examen
1. Registrar usuario.
2. Hacer login para obtener `access_token`.
3. En Swagger usar botón **Authorize** con `Bearer <token>`.
4. Crear producto.
5. Subir imagen al producto con `POST /products/:id/images`.
6. Consumir CRUD + imágenes desde frontend.
