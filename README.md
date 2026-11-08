
# Ejercicios Semana 7 — CodeNode

Proyecto desarrollado con Next.js, TypeScript y App Router.

## Ejercicio 1 — Route Handlers

Hemos creado dos endpoints para practicar cómo recibir peticiones HTTP y devolver respuestas JSON.

### GET /api/estado

Devuelve información sobre el estado de Tueste Norte.

Comando de prueba:

```powershell
curl.exe -i http://localhost:3000/api/estado
```

Resultado esperado: HTTP 200 OK.

```json
{
  "abierto": true,
  "cafesDisponibles": 4,
  "proximaCata": "2026-11-28"
}
```

### POST /api/reservas

Recibe un nombre y un número de personas.

Validaciones:
- El nombre no puede estar vacío.
- El número de personas debe ser un entero entre 1 y 6.

#### Prueba 1 — Reserva correcta

```powershell
curl.exe -i -X POST "http://localhost:3000/api/reservas" -H "Content-Type: application/json" --data-binary '{\"nombre\":\"Ana\",\"personas\":2}'
```

Respuesta: HTTP 201 Created.

```json
{
  "reserva": {
    "nombre": "Ana",
    "personas": 2
  }
}
```

#### Prueba 2 — Demasiadas personas

```powershell
curl.exe -i -X POST "http://localhost:3000/api/reservas" -H "Content-Type: application/json" --data-binary '{\"nombre\":\"Ana\",\"personas\":8}'
```

Respuesta: HTTP 400 Bad Request.

```json
{
  "error": "El número de personas debe ser un entero entre 1 y 6."
}
```

#### Prueba 3 — Nombre vacío

```powershell
curl.exe -i -X POST "http://localhost:3000/api/reservas" -H "Content-Type: application/json" --data-binary '{\"nombre\":\"\",\"personas\":2}'
```

Respuesta: HTTP 400 Bad Request.

```json
{
  "error": "El nombre es obligatorio."
}
```

## Cómo ejecutar el proyecto

Instalar las dependencias:

```powershell
npm install
```

Arrancar el servidor de desarrollo:

```powershell
npm run dev
```

Abrir http://localhost:3000.

## Ejercicio 2 — Drizzle ORM y SQLite

En este ejercicio hemos creado una base de datos SQLite y hemos utilizado Drizzle ORM para gestionar los datos desde TypeScript.

### Tabla cafes

Hemos definido la tabla `cafes` en `db/schema.ts` con los siguientes campos:

- `id`: identificador único y autoincremental.
- `nombre`: nombre del café.
- `origen`: país de procedencia.
- `precio`: precio del café.
- `tueste`: nivel de tueste (claro, medio u oscuro).

### Archivos principales

- `db/schema.ts`: define la estructura de la tabla.
- `db/index.ts`: establece la conexión con SQLite.
- `db/seed.ts`: inserta cuatro cafés de prueba.
- `db/consultas.ts`: realiza las consultas.
- `drizzle.config.ts`: configura Drizzle Kit.

### Crear la base de datos

```powershell
npx drizzle-kit push
```

Este comando crea o actualiza la estructura de la base de datos SQLite.

### Insertar los cafés de prueba

```powershell
npx tsx db/seed.ts
```

El archivo inserta cuatro cafés: Etiopía Sidamo, Guatemala Volcán, Colombia Supremo y Brasil Santos.

Debe ejecutarse una sola vez para evitar duplicados.

### Ejecutar las consultas

```powershell
npx tsx db/consultas.ts
```

Hemos realizado dos consultas:

1. Obtener todos los cafés ordenados por precio de menor a mayor mediante `asc(cafes.precio)`.
2. Obtener únicamente los cafés de tueste medio mediante `eq(cafes.tueste, "medio")`.

La segunda consulta devuelve Guatemala Volcán y Colombia Supremo.

### Visualizar la base de datos

```powershell
npx drizzle-kit studio
```

Drizzle Studio permite consultar visualmente las tablas y sus registros desde el navegador.

### Git y la base de datos

El archivo `sqlite.db` está incluido en `.gitignore` para evitar subir la base de datos local al repositorio.

La base de datos puede reconstruirse ejecutando los comandos de creación e inserción anteriores.

## Ejercicio 3 — Server Actions y valoraciones de catas

En este ejercicio hemos creado un sistema de valoraciones
para las catas de café de Tueste Norte.


### Mejoras del formulario

Hemos creado el componente `BotonEnviar.tsx`, que utiliza
el hook `useFormStatus` de React.

Este componente permite:

- Mostrar el texto "Enviando..." mientras se procesa
  una valoración.
- Desactivar temporalmente el botón durante el envío.
- Evitar pulsaciones repetidas mientras se guarda.

También hemos mejorado la presentación del formulario
mediante estilos CSS:

- Campos con bordes visibles y esquinas redondeadas.
- Espaciado entre los diferentes elementos.
- Campo de puntuación adaptado a valores numéricos.
- Botón marrón con texto blanco, siguiendo la estética
  del proyecto Tueste Norte.


### Base de datos

Hemos añadido la tabla `valoraciones` utilizando
Drizzle ORM y SQLite.

La tabla contiene los siguientes campos:

- id: identificador único de la valoración.
- nombre: nombre del cliente.
- comentario: opinión sobre la cata.
- puntuacion: valoración numérica del 1 al 5.

### Página de valoraciones

Hemos creado la ruta `/catas` mediante un Server
Component de Next.js.

Esta página consulta las valoraciones almacenadas
en SQLite y las muestra al usuario.

### Formulario y Server Action

Hemos creado un formulario que permite introducir:

- Nombre del cliente.
- Comentario sobre la cata.
- Puntuación del 1 al 5.

El formulario utiliza la Server Action `guardarValoracion`,
definida en `app/catas/actions.ts`.

La función valida los datos en el servidor y guarda
las valoraciones mediante Drizzle ORM.

Después de guardar, utilizamos `revalidatePath("/catas")`
para actualizar el contenido de la página.

### Pruebas realizadas

- Envío correcto de valoraciones.
- Comprobación de campos obligatorios.
- Rechazo de puntuaciones inferiores a 1.
- Rechazo de puntuaciones superiores a 5.
- Rechazo de puntuaciones decimales.
- Comprobación de persistencia al recargar la página.
- Verificación de los registros mediante Drizzle Studio.

### Resultado

El sistema permite registrar y consultar valoraciones
de catas utilizando Next.js, Server Actions,
Drizzle ORM y SQLite.
