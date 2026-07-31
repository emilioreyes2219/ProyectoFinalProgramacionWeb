# Fundas de Volantes 🚗

## Proyecto Final - Programación Web

Aplicación web Full Stack para la administración y venta de fundas para volante de automóvil.

El sistema permite gestionar productos, categorías, colores, usuarios y pedidos mediante una arquitectura separada:

- Backend: Laravel 12 como API REST.
- Frontend: React con Vite.
- Base de datos: MySQL.

La aplicación implementa autenticación con Laravel Sanctum, control de acceso mediante roles y rutas protegidas en React.

---

# Integrantes

- Jorge Emilio Núñez Reyes
- Gerardo Jared Martinez Espina

---

# Repositorio GitHub

https://github.com/emilioreyes2219/ProyectoFinalProgramacionWeb

---

# Tecnologías utilizadas

## Backend

- Laravel 12
- PHP 8.4
- MySQL 8
- Laravel Sanctum
- Eloquent ORM
- API Resources
- Form Requests
- Middleware personalizado de roles


## Frontend

- React
- Vite
- React Router DOM
- Axios
- SweetAlert2
- Lucide React


## Herramientas

- Git
- GitHub
- Bruno API Client
- Figma
- Ubuntu VPS
- Nginx
- Let's Encrypt
- Certbot

---

# Descripción del sistema

Fundas de Volantes es un sistema web orientado a la venta y administración de fundas para volante.

Cuenta con tres tipos de usuarios:

## Administrador

Permite:

- Gestión de productos.
- Gestión de categorías.
- Gestión de colores.
- Administración de pedidos.
- Control general del sistema.


## Vendedor

Permite:

- Consultar productos.
- Gestionar pedidos.
- Actualizar estados de pedidos.


## Cliente

Permite:

- Consultar catálogo.
- Buscar productos.
- Agregar productos al carrito.
- Crear pedidos.
- Consultar sus pedidos.

---

# Estructura del proyecto

```
ProyectoFinalProgramacionWeb
│
├── backend
│   ├── app
│   ├── database
│   ├── routes
│   └── FundasVolantes API-Bruno
│
└── frontend
    └── src
        ├── api
        ├── components
        ├── layouts
        ├── pages
        └── services
```

---

# Base de datos

Motor utilizado:

```
MySQL 8
```

La base de datos fue creada mediante migraciones de Laravel.

## Tablas principales

### users

Usuarios del sistema.

Campos principales:

- id
- name
- email
- password
- role
- telefono


Relación:

```
Usuario 1:N Pedidos
```

---

### categorias

Categorías de productos.

Campos:

- id
- nombre
- descripcion
- activo


Relación:

```
Categoria 1:N Productos
```

---

### productos

Productos disponibles para venta.

Campos:

- id
- categoria_id
- nombre
- descripcion
- precio
- stock
- imagen
- activo


Relaciones:

```
Producto N:1 Categoria

Producto 1:N DetallePedido

Producto N:M Color
```

---

### colors

Colores disponibles.

Campos:

- id
- nombre
- codigo_hex
- activo


Relación:

```
Color N:M Producto
```

Tabla intermedia:

```
color_producto
```

---

### pedidos

Pedidos realizados por clientes.

Campos:

- id
- user_id
- folio
- estado
- total
- direccion_envio
- telefono_contacto
- notas


Relación:

```
Usuario 1:N Pedidos
```

---

### detalle_pedidos

Detalle de productos comprados.

Campos:

- id
- pedido_id
- producto_id
- cantidad
- precio_unitario
- subtotal


Relaciones:

```
Pedido 1:N Detalles

Producto 1:N Detalles
```

---

# Usuarios de prueba

## Administrador

```
Correo:
admin@fundasvolantes.com

Contraseña:
Admin#123
```


## Vendedor

```
Correo:
vendedor@fundasvolantes.com

Contraseña:
Vendedor#123
```


## Cliente

```
Correo:
cliente@fundasvolantes.com

Contraseña:
Cliente#123
```

---

# API REST Laravel

El backend funciona como una API REST protegida con Laravel Sanctum.

## Autenticación

Registro:

```
POST /api/register
```

Login:

```
POST /api/login
```

Logout:

```
POST /api/logout
```

---

# Productos

Obtener productos:

```
GET /api/productos
```

Crear producto:

```
POST /api/productos
```

Actualizar:

```
PUT /api/productos/{id}
```

Eliminar:

```
DELETE /api/productos/{id}
```

---

# Categorías

Obtener:

```
GET /api/categorias
```

Crear:

```
POST /api/categorias
```

Actualizar:

```
PUT /api/categorias/{id}
```

---

# Pedidos

Obtener pedidos:

```
GET /api/pedidos
```

Crear pedido:

```
POST /api/pedidos
```

Actualizar estado:

```
PUT /api/pedidos/{id}
```

Estados disponibles:

```
pendiente
confirmado
en_preparacion
enviado
entregado
cancelado
```

---

# Seguridad

Implementaciones:

- Laravel Sanctum para autenticación.
- Middleware de roles.
- Rutas protegidas.
- Contraseñas cifradas con Hash.
- Validaciones mediante Form Requests.
- Manejo de errores HTTP.

Códigos manejados:

```
401 Unauthorized
403 Forbidden
404 Not Found
422 Validation Error
500 Server Error
```

---

# Frontend React

Características:

- Login.
- Registro.
- Control de acceso por rol.
- Navbar dinámico.
- Sidebar.
- Catálogo de productos.
- Carrito de compras.
- Gestión de productos.
- Gestión de pedidos.
- Modales.
- Alertas con SweetAlert2.

---

# Bruno API Testing

Colección ubicada en:

```
backend/FundasVolantes API-Bruno
```

Incluye:

- Login.
- Uso de token Bearer.
- Peticiones protegidas.
- Pruebas de errores.
- Validaciones.

Ejemplo:

```
Authorization:
Bearer {token}
```

---

# Instalación local

## Backend

```bash
cd backend
```

Instalar dependencias:

```bash
composer install
```

Crear archivo:

```
.env
```

Generar llave:

```bash
php artisan key:generate
```

Ejecutar migraciones:

```bash
php artisan migrate --seed
```

Ejecutar servidor:

```bash
php artisan serve
```

---

## Frontend

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

---

# Despliegue VPS

Servidor utilizado:

```
Hostinger VPS
Ubuntu
```

Servicios configurados:

- Nginx como servidor web y proxy reverso.
- PHP-FPM.
- MySQL.
- Laravel API.
- React compilado.
- Certificado SSL Let's Encrypt.


## URL del proyecto

```
https://fundasvolantes.duckdns.org
```


## URL base de la API

```
https://fundasvolantes.duckdns.org/api
```

---

# Certificado HTTPS

El sitio utiliza:

```
Let's Encrypt + Certbot
```

El certificado SSL fue configurado directamente en el VPS mediante Nginx.

---

# Diseño Figma

Prototipo navegable:

```
PENDIENTE LINK
```

Incluye:

- Login.
- Registro.
- Panel administrador.
- Panel vendedor.
- Catálogo cliente.
- Carrito.
- Pedidos.

---

# GitHub Projects

Tablero:

https://github.com/users/emilioreyes2219/projects/1

Columnas:

- Backlog
- To Do
- In Progress
- In Review
- Done

---

# Comunicación con usuarios

Implementaciones futuras:

- Correo mediante SMTP/Postfix.
- SMS mediante API.
- WhatsApp mediante API.

---

# Autores

Proyecto desarrollado para:

**Programación Web 2026**