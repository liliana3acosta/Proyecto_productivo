# Proyecto Productivo — Artdance Fashion

Tienda en línea + agenda de citas para Artdance Fashion. El proyecto tiene dos partes:

- **backend/**: API REST con Node.js, Express y MongoDB (Mongoose). Maneja usuarios, autenticación (JWT), productos, categorías, carrito, órdenes, pagos (simulados), citas y un panel de administración.
- **frontend/**: aplicación React + Vite + Tailwind que consume esa API.

## Funcionalidades

- Registro e inicio de sesión con JWT.
- Catálogo de productos filtrable por categoría.
- Carrito de compras persistente (ligado al usuario, guardado en la base de datos).
- Checkout que crea una orden real y procesa un pago simulado.
- Historial de pedidos del usuario.
- Agenda de citas (crear, ver y cancelar) para servicios como ajustes de vestuario.
- Panel de administración (`/admin`, solo para usuarios con rol `admin`): resumen de métricas, gestión de estado de citas y pedidos, y listado/eliminación de productos.

## Requisitos

- Node.js 18+
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)

## Cómo correr el proyecto

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # y edita JWT_SECRET por un valor propio y seguro
npm run dev
```

El backend queda escuchando en `http://localhost:3000` (configurable con `PORT` en `.env`).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

El archivo `frontend/.env` ya apunta a `http://localhost:3000/api`. Si el backend corre en otra URL, cambia `VITE_API_URL` ahí.

### 3. Crear un usuario administrador

Por defecto, todo usuario que se registra desde el frontend queda con rol `cliente`. Para probar el panel de `/admin`, registra un usuario normalmente y luego, con MongoDB Compass/shell o Postman contra `PUT /api/users/:id/rol` (usando el token de otro admin), cambia su `rol` a `"admin"`. La primera vez, lo más simple es editarlo directamente en la base de datos:

```js
// en mongosh, conectado a la base proyecto_productivo
db.users.updateOne({ email: "tu-correo@ejemplo.com" }, { $set: { rol: "admin" } })
```

### 4. Cargar categorías y productos de prueba

El catálogo empieza vacío. Crea al menos una categoría y algunos productos contra la API (por ejemplo con Postman/Insomnia), usando el token de un usuario admin:

```
POST /api/categories        { "nombre": "Vestuario de Danza" }
POST /api/products          { "nombre": "...", "descripcion": "...", "precio": 50000, "stock": 10, "categoria": "<id de la categoría>", "talla": ["S","M","L"] }
POST /api/products/:id/imagen   (form-data, campo "imagen", archivo de imagen)
```

## Notas técnicas

- El carrito y las citas requieren sesión iniciada (el backend protege esas rutas con JWT).
- Los pagos son simulados (`services/payment.service.js` lo indica explícitamente); no hay integración con una pasarela real como Stripe o Mercado Pago.
- Las imágenes de productos se guardan en `backend/uploads/` y se sirven en `/uploads/...`; esa carpeta está en `.gitignore`, así que no se sube al repositorio.
- Recuerda no subir nunca tu `.env` real (ya está en `.gitignore`). Cambia `JWT_SECRET` antes de desplegar a producción.

## Próximos pasos posibles

- Formulario de creación/edición de productos y categorías desde el panel de admin (hoy solo permite ver y eliminar productos).
- Subida de imágenes de producto desde la interfaz (el endpoint ya existe en el backend).
- Reseñas de productos (el backend ya expone `/api/reviews`, falta la interfaz).
- Paginación visible en "Mis pedidos" (el backend ya la soporta).
