# Combinando Conceptos Avanzados de JS

**Instrucciones:** Resuelve los siguientes ejercicios aplicando los conceptos de desestructuración, operadores spread/rest, closures, Map y Set según sea necesario.

---

### Ejercicio 1: Gestor de Tareas Mejorado

Crea un gestor de tareas que utilice `Map` para almacenar las tareas, donde la clave sea un ID único y el valor sea un objeto de tarea. Cada tarea tendrá `id`, `descripcion`, `completada` (booleano) y un `Set` de `etiquetas`.

Implementa las siguientes funciones:

1.  `agregarTarea({ id, descripcion, etiquetas = [] })`:
    - Debe usar desestructuración para los parámetros.
    - Si el `id` ya existe, no debe sobrescribir la tarea existente y podría devolver un mensaje de error o `false`.
    - Las `etiquetas` deben almacenarse en un `Set` dentro del objeto de la tarea.
    - La tarea se guarda en un `Map` global o encapsulado.
2.  `marcarCompletada(id)`: Cambia el estado `completada` de la tarea a `true`.
3.  `obtenerTareasPorEtiqueta(etiqueta)`: Devuelve un array con las descripciones de las tareas que contengan la `etiqueta` especificada.
4.  `obtenerResumenTareas()`: Devuelve un objeto con `{ total, completadas, pendientes }`.

**Pistas:**

- Puedes usar un closure para encapsular el `Map` de tareas si lo deseas.
- Para `obtenerTareasPorEtiqueta`, necesitarás iterar el `Map` y luego verificar el `Set` de etiquetas de cada tarea.

---

### Ejercicio 2: Procesador de Listas de Invitados

Debes crear una función `procesarListas` que acepte un número variable de listas de invitados (arrays de strings con nombres).
La función debe:

1.  Combinar todas las listas en una sola.
2.  Eliminar nombres duplicados (cada invitado debe aparecer solo una vez).
3.  Devolver un objeto con dos propiedades:
    - `invitadosUnicos`: Un `Set` con los nombres únicos de los invitados.
    - `conteoTotalInvitados`: El número total de nombres recibidos antes de la deduplicación.
    - `conteoInvitadosUnicos`: El número de invitados únicos.

**Pistas:**

- Usa el operador `rest` para aceptar múltiples listas.
- Usa el operador `spread` para combinar los arrays.
- Usa `Set` para obtener los nombres únicos.

---

### Ejercicio 3: Creador de Funciones de Filtrado

Escribe una función `crearFiltroPorPropiedad` que sea una factory function (utilice closures).
Esta función debe tomar un `nombrePropiedad` como argumento.
Debe devolver otra función. Esta función devuelta tomará un `valorEsperado` y un array de objetos.
Finalmente, filtrará el array de objetos, devolviendo solo aquellos objetos donde la propiedad (especificada por `nombrePropiedad` en la factory) sea igual al `valorEsperado`.

**Ejemplo de uso:**
`const filtrarPorCiudad = crearFiltroPorPropiedad("ciudad");`
`const residentesMadrid = filtrarPorCiudad("Madrid", [{nombre: "Ana", ciudad: "Madrid"}, {nombre: "Luis", ciudad: "Barcelona"}]);`
`// residentesMadrid debería ser [{nombre: "Ana", ciudad: "Madrid"}]`

**Pistas:**

- La función externa "recordará" `nombrePropiedad` gracias al closure.
- La función interna usará este `nombrePropiedad` para acceder dinámicamente a la propiedad del objeto.

---

### Ejercicio 4: Registro de Eventos con Timestamps Únicos

Crea un sistema para registrar eventos. Cada evento debe tener un timestamp como clave y una descripción como valor.

1.  Usa un `Map` para almacenar los eventos.
2.  Crea una función `registrarEvento(descripcion)`:
    - Debe generar un timestamp (puedes usar `Date.now()`).
    - Para asegurar la unicidad del timestamp como clave (en caso de llamadas muy rápidas), si el timestamp ya existe en el `Map`, intenta con el siguiente milisegundo hasta encontrar uno libre.
    - Guarda el evento en el `Map`.
3.  Crea una función `obtenerEventosEntre({ inicio, fin })` que use desestructuración para los parámetros `inicio` y `fin` (timestamps). Debe devolver un array de objetos `{ timestamp, descripcion }` para los eventos dentro de ese rango.

**Pistas:**

- Un `while` loop puede ser útil para encontrar un timestamp único.
- Para `obtenerEventosEntre`, itera sobre las claves (timestamps) del `Map`.

---

### Ejercicio 5: Transformador de Datos de API

Imagina que recibes datos de usuarios de una API en un formato y necesitas transformarlos.
Los datos vienen como un array de objetos:
`[{ id: 1, nombre_completo: "Ana Pérez", email: "ana.perez@example.com", detalles: { edad: 30, pais_residencia: "ES" } }, ...]`

Crea una función `transformarYAgruparUsuarios(usuariosApi, ...propiedadesAdicionales)`:

1.  `usuariosApi`: El array de objetos como el descrito.
2.  `...propiedadesAdicionales`: Un rest parameter que contendrá nombres de propiedades a extraer directamente del objeto `detalles` (ej. "edad", "pais_residencia").
3.  La función debe transformar cada objeto de usuario al siguiente formato:
    `{ userId: id, nombre: (solo el nombre, no el apellido), email, ... (las propiedades adicionales extraídas de 'detalles') }`
4.  Además, la función debe agrupar a los usuarios por `pais_residencia` (si esta propiedad se solicitó y existe). El resultado de la agrupación debe ser un `Map` donde la clave es el código del país y el valor es un `Set` de `userId`s de los usuarios de ese país.
5.  La función debe devolver un objeto con:
    - `usuariosTransformados`: Array de los objetos de usuario transformados.
    - `usuariosPorPais`: El `Map` de la agrupación por país (o un `Map` vacío si "pais_residencia" no estaba en `propiedadesAdicionales`).

**Pistas:**

- Usa desestructuración para acceder a las propiedades anidadas y para renombrar.
- Usa el operador `spread` para construir los nuevos objetos de usuario de forma dinámica.
- Itera sobre `propiedadesAdicionales` para construir el objeto transformado.
- Usa `Map` y `Set` para la agrupación.
