
# bitacora-cli

Proyecto de aprendizaje desarrollado con JavaScript y Node.js para administrar una bitácora desde la consola. Permite agregar, listar, buscar y borrar notas, crear respaldos y exportar información.

## Requisitos

- Node.js
- npm

## Instalación

Desde la carpeta principal del proyecto, ejecuta:

```bash
npm install
```

Este comando instala las dependencias declaradas en `package.json`.

## Uso

Inicia el programa con:

```bash
npm start
```

Los comandos se ejecutan desde la terminal, en la carpeta principal del proyecto.

## Comandos disponibles

| Comando | Descripción | Ejemplo |
|---|---|---|
| `agregar` | Agrega una nota con una etiqueta opcional. Si no se indica, usa `general`. Rechaza textos duplicados. | `node src/index.js agregar "Estudiar Node.js" estudio` |
| `listar` | Muestra las últimas cinco notas por defecto. Puedes indicar una cantidad. | `node src/index.js listar 3` |
| `buscar` | Busca una palabra dentro del texto de las notas, sin distinguir mayúsculas y minúsculas. | `node src/index.js buscar Node` |
| `borrar` | Elimina una nota usando su ID. | `node src/index.js borrar a1b2c3d4` |
| `ayuda` | Muestra los comandos disponibles. También se muestra si no se indica un comando. | `node src/index.js ayuda` |
| `respaldar` | Crea una copia de `notas.json` en la carpeta `respaldos`. | `node src/index.js respaldar` |
| `exportar` | Genera un archivo de texto con las notas y lo lleva a una carpeta de destino. | `node src/index.js exportar "C:\Users\Usuario\Documents"` |

## Archivos y almacenamiento

- `data/notas.json`: almacena las notas.
- `data/bitacora.log`: registra los comandos y sus resultados.
- `respaldos/`: contiene las copias de seguridad.
- `salida/`: se utiliza temporalmente para generar el archivo de exportación.

## Paquete de fechas

El paquete `fechas-bitacora-rudy` se publicó en npm.

Enlace: https://www.npmjs.com/package/fechas-bitacora-rudy

Contiene las funciones `getTimeStamp()`, `getLongTime()` y `getShortDate()` para trabajar con fechas.

## Reflexión — Parte 5

### 1. ¿Por qué elegiste CommonJS o ES Modules?

Elegí ES Modules para la bitácora porque permite importar funciones con `import` y exportarlas con `export`.Se me hace mucho mas sencillo manejar module por que maneja un formato mas simple para mi.

### 2. ¿Cuál es la diferencia entre importar `fs`, `object-hash`, `fechas` y `notas.js`?

`fs` y `path` son módulos que vienen  de Node.js, en cambio, `object-hash` es una libreria instalada en `node_modules`. `notas.js` es un archivo de mi proyecto y lo importo usando su ruta , cuando es necesario. Finalmente `fechas-bitacora-rudy` se entiende como un paquete que imorto por su nombre .

### 3. ¿Por qué `data/notas.json` se resuelve distinto desde otra carpeta?

Porque el programa puede buscar el archivo en un lugar diferente y encontrar otro archivo con el mismo nombre si lo ejecuto desde otra carpeta. Para evitarlo, uso `import.meta.dirname`, que me permite encontrar dónde está `almacen.js` y, desde allí, buscar `notas.json` dentro de la carpeta `data`.

### 4. ¿Por qué `node_modules/` no se sube a Git?
Con `.gitignore`, que es un archivo que permite excluir archivos o carpetas , excluí `node_modules/`, porque contiene las dependencias instaladas y puede ocupar mucho espacio. Además, otra persona puede instalarlas ejecutando `npm install`.

### 5. ¿Qué diferencia viste al importar tu paquete CommonJS desde ES Modules?

El paquete `fechas-bitacora-rudy` usa CommonJS y exporta sus funciones con `module.exports`. La bitácora del cliente usa ES Modules, lo importé con `import fechas from 'fechas-bitacora-rudy'`. Si mi proyecto usara CommonJS, podría importarlo con `require()`.

## Tecnologías

- JavaScript
- Node.js
- npm
- Git
