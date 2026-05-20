# Backend NestJS: CRUD Productos + JWT + Mongo + Swagger

Proyecto base para examen: API backend con autenticación JWT, usuarios, CRUD de productos y documentación Swagger.

## ¿Qué debe hacer el alumno?
El stack backend + base de datos ya está preparado. El alumno debe:
1. Construir su propio frontend.
2. Dockerizar su frontend.
3. Conectarlo a este stack mediante un `docker-compose` adicional o extendido usando la red `exam_net`.

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

## Endpoints principales
### Auth
- `POST /auth/register`
- `POST /auth/login`

### Products (requiere Bearer Token)
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

## CORS para frontend del alumno
- Configura `FRONTEND_URL` en `.env`.
- Puedes indicar uno o varios orígenes separados por coma.
  - Ejemplo: `FRONTEND_URL=http://localhost:5173,http://localhost:4173`

## Ejemplo de `docker-compose` del alumno
Ejemplo mínimo para que el frontend se conecte al backend ya preparado:

```yaml
services:
  frontend:
    build: .
    container_name: alumno_frontend
    ports:
      - '5173:80'
    environment:
      - VITE_API_URL=http://api:3000
    networks:
      - exam_net

networks:
  exam_net:
    external: true
```

> Nota: dentro de la red Docker, el backend se resuelve por nombre de servicio `api`.

## Flujo recomendado para examen
1. Registrar usuario.
2. Hacer login para obtener `access_token`.
3. En Swagger usar botón **Authorize** con `Bearer <token>`.
4. Consumir CRUD desde frontend.
