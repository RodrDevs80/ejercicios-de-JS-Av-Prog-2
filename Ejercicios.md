## Conceptos Avanzados de JS (Repaso y Profundización)

### 1. Desestructuración (Objetos y Arrays)

La desestructuración es una sintaxis que permite extraer datos de arrays u objetos y asignarlos a variables de forma concisa.

#### a. Desestructuración de Arrays

Permite extraer elementos de un array en variables individuales.

```javascript
// Ejemplo básico
const numeros = [10, 20, 30, 40, 50];
const [primero, segundo] = numeros;
console.log(primero); // 10
console.log(segundo); // 20

// Omitir elementos
const [, , tercero, , quinto] = numeros;
console.log(tercero); // 30
console.log(quinto); // 50

// Uso del operador Rest para obtener el resto de elementos
const [a, b, ...restoDelArray] = numeros;
console.log(a); // 10
console.log(b); // 20
console.log(restoDelArray); // [30, 40, 50]

// Valores por defecto
const colores = ["rojo"];
const [colorPrincipal, colorSecundario = "azul"] = colores;
console.log(colorPrincipal); // rojo
console.log(colorSecundario); // azul (valor por defecto)
```

#### b. Desestructuración de Objetos

Permite extraer propiedades de un objeto en variables individuales.

```javascript
const persona = {
  id: 1,
  nombre: "Ana",
  edad: 28,
  ciudad: "Madrid",
  profesion: "Desarrolladora",
};

// Ejemplo básico
const { nombre, edad } = persona;
console.log(nombre); // Ana
console.log(edad); // 28

// Asignar a nuevas variables con nombres diferentes
const { nombre: nombreCompleto, profesion: cargo } = persona;
console.log(nombreCompleto); // Ana
console.log(cargo); // Desarrolladora

// Valores por defecto
// Si una propiedad no existe en el objeto, podemos asignar un valor por defecto
const { pais = "No especificado", id } = usuario;
console.log(pais); // "No especificado" (porque 'pais' no existe en 'usuario')
console.log(id); // 1

const configuracion = {
  tema: "oscuro",
};
const { tema, idioma = "es" } = configuracion;
console.log(tema); // oscuro
console.log(idioma); // es

// Desestructuración anidada
const usuario = {
  id: 1,
  info: {
    nombre: "Carlos",
    email: "carlos@example.com",
  },
  roles: ["admin", "editor"],
};

const {
  id,
  info: { nombre: nombreUsuario, email },
  roles: [rolPrincipal],
} = usuario;
console.log(id); // 1
console.log(nombreUsuario); // Carlos
console.log(email); // carlos@example.com
console.log(rolPrincipal); // admin

// Uso del operador Rest para obtener el resto de propiedades
const { nombre: n, edad: e, ...restoDelObjeto } = persona;
console.log(n); // Ana
console.log(e); // 28
console.log(restoDelObjeto); // { ciudad: "Madrid", profesion: "Desarrolladora" }
```

#### c. Aplicaciones Avanzadas de la Desestructuración

- **Importación múltiple (ES Modules):**
  Cuando importamos módulos, la importación de múltiples elementos nombrados es un ejemplo de desestructuración de objetos. El módulo exporta un objeto donde las claves son los nombres de las exportaciones.

  ```javascript
  // En un archivo, por ejemplo, 'utilidades.js':
  //...
  export const suma = (a, b) => a + b;
  export const PI = 3.1416;
  export function saludar(nombre) {
    return `Hola, ${nombre}`;
  }
  //...

  // En otro archivo:
  //...
  import { suma, PI, saludar as decirHola } from "./utilidades.js";

  console.log(suma(2, 3)); // 5
  console.log(PI); // 3.1416
  console.log(decirHola("Mundo")); // Hola, Mundo
  //...
  ```

  Esto es conceptualmente similar a:
  `const { suma, PI, saludar: decirHola } = require('./utilidades.js'); // Si fuera CommonJS`

- **Envío de parámetros en funciones:**
  La desestructuración es muy útil para manejar parámetros en funciones, especialmente cuando se trabaja con objetos de configuración.

  ```javascript
  function crearUsuario({ nombre, email, activo = true, roles = ["usuario"] }) {
    console.log(
      `Nombre: ${nombre}, Email: ${email}, Activo: ${activo}, Roles: ${roles.join(
        ", "
      )}`
    );
    // Lógica para crear el usuario...
    return { id: Date.now(), nombre, email, activo, roles };
  }

  const datosUsuario = {
    email: "juan@example.com",
    nombre: "Juan Perez",
  };
  const nuevoUsuario = crearUsuario(datosUsuario);
  // Nombre: Juan Perez, Email: juan@example.com, Activo: true, Roles: usuario

  const adminUsuario = crearUsuario({
    nombre: "Admin User",
    email: "admin@example.com",
    roles: ["administrador", "editor"],
    activo: false,
  });
  // Nombre: Admin User, Email: admin@example.com, Activo: false, Roles: administrador, editor
  ```

  Esto mejora la legibilidad y permite pasar parámetros en cualquier orden, además de facilitar los valores por defecto.

- **Retorno de múltiples valores (objetos) en funciones:**
  Las funciones en JavaScript solo pueden retornar un valor. Sin embargo, este valor puede ser un objeto o un array. La desestructuración facilita el manejo de estos "múltiples" valores retornados.

  ```javascript
  function obtenerCoordenadas() {
    // Simulación de obtención de coordenadas
    return { x: 100, y: 250, z: 50 };
  }

  const { x, y, z } = obtenerCoordenadas();
  console.log(`Coordenadas: X=${x}, Y=${y}, Z=${z}`); // Coordenadas: X=100, Y=250, Z=50

  // Si solo necesitamos algunas:
  const { x: posX, y: posY } = obtenerCoordenadas();
  console.log(`Posición: X=${posX}, Y=${posY}`); // Posición: X=100, Y=250
  ```

  ```javascript
  function procesarPedido(idPedido) {
    // ...lógica para procesar pedido...
    const exito = Math.random() > 0.5;
    if (exito) {
      return {
        estado: "completado",
        mensaje: "Pedido procesado con éxito.",
        idConfirmacion: `CONF-${idPedido}`,
      };
    } else {
      return {
        estado: "fallido",
        mensaje: "Error al procesar el pedido.",
        codigoError: 500,
      };
    }
  }

  const { estado, mensaje, idConfirmacion, codigoError } =
    procesarPedido("ABC123_");
  if (estado === "completado") {
    console.log(`${mensaje} ID: ${idConfirmacion}`);
  } else {
    console.log(`${mensaje} Código: ${codigoError}`);
  }
  ```

### 2. Operadores Spread (`...`) y Rest (`...`)

Aunque usan la misma sintaxis (`...`), tienen propósitos diferentes según el contexto.

#### a. Operador Rest (Parámetros Rest)

Recoge el "resto" de los argumentos de una función en un array. Debe ser el último parámetro en la definición de la función.

```javascript
function sumarTodos(...numeros) {
  // 'numeros' será un array
  return numeros.reduce((acumulador, actual) => acumulador + actual, 0);
}

console.log(sumarTodos(1, 2, 3)); // 6
console.log(sumarTodos(10, 20, 30, 40)); // 100
console.log(sumarTodos()); // 0

function registrarUsuario(id, nombre, ...detallesAdicionales) {
  console.log(`ID: ${id}, Nombre: ${nombre}`);
  if (detallesAdicionales.length > 0) {
    console.log("Detalles adicionales:", detallesAdicionales.join(", "));
  }
}

registrarUsuario(1, "Ana", "España", "Madrid", "Desarrolladora");
// ID: 1, Nombre: Ana
// Detalles adicionales: España, Madrid, Desarrolladora
```

#### b. Operador Spread

Expande un iterable (como un array o string) en sus elementos individuales, o las propiedades de un objeto en otro objeto literal.

- **En arrays:**

  ```javascript
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];

  // Concatenar arrays
  const arrConcatenado = [...arr1, ...arr2];
  console.log(arrConcatenado); // [1, 2, 3, 4, 5, 6]

  // Copiar un array (shallow copy)
  const copiaArr1 = [...arr1];
  console.log(copiaArr1); // [1, 2, 3]
  copiaArr1.push(4);
  console.log(arr1); // [1, 2, 3] (original no afectado)

  // Añadir elementos a un array
  const arrConNuevosElementos = [0, ...arr1, 7, 8];
  console.log(arrConNuevosElementos); // [0, 1, 2, 3, 7, 8]

  // Convertir un string en un array de caracteres
  const palabra = "Hola";
  const letras = [...palabra];
  console.log(letras); // ['H', 'o', 'l', 'a']
  ```

- **En llamadas a funciones:**

  ```javascript
  const numerosParaSumar = [5, 10, 15];
  // En lugar de Math.max(numerosParaSumar[0], numerosParaSumar[1], numerosParaSumar[2])
  console.log(Math.max(...numerosParaSumar)); // 15
  ```

- **En objetos (ES2018+):**

  ```javascript
  const objBase = { a: 1, b: 2 };
  const objAdicional = { c: 3, d: 4 };

  // Combinar objetos (shallow merge)
  const objCombinado = { ...objBase, ...objAdicional, e: 5 };
  console.log(objCombinado); // { a: 1, b: 2, c: 3, d: 4, e: 5 }

  // Propiedades posteriores sobrescriben anteriores con el mismo nombre
  const objConOverride = { ...objBase, b: 20, z: 30 };
  console.log(objConOverride); // { a: 1, b: 20, z: 30 }

  // Copiar un objeto (shallow copy)
  const copiaObjBase = { ...objBase };
  console.log(copiaObjBase); // { a: 1, b: 2 }
  copiaObjBase.a = 100;
  console.log(objBase.a); // 1 (original no afectado)
  ```

### 3. Closures (Clausuras)

#### a. Repaso Conceptual

Un closure (o clausura) es la combinación de una función y el ámbito léxico en el que fue declarada. Esto significa que una función interna "recuerda" y tiene acceso a las variables de su función externa, incluso después de que la función externa haya terminado de ejecutarse.

Características clave:

1.  Una función interna.
2.  La función interna accede a variables de la función externa (o de ámbitos superiores).
3.  La función externa retorna la función interna (o la pasa a otro sitio para ser ejecutada más tarde).

#### b. Aplicaciones Prácticas

- **Emulación de variables privadas / Módulos (Patrón Módulo):**
  Antes de los ES Modules, los closures eran la forma principal de crear encapsulación y "variables privadas" en JavaScript.

  ```javascript
  function crearContador() {
    let cuenta = 0; // Esta variable es "privada" para el exterior

    return {
      incrementar: function () {
        cuenta++;
        console.log(cuenta);
      },
      obtenerCuenta: function () {
        return cuenta;
      },
      decrementar: function () {
        if (cuenta > 0) {
          cuenta--;
        }
        console.log(cuenta);
      },
    };
  }

  const miContador = crearContador();
  miContador.incrementar(); // 1
  miContador.incrementar(); // 2
  console.log(miContador.obtenerCuenta()); // 2
  // console.log(miContador.cuenta); // undefined, no se puede acceder directamente
  miContador.decrementar(); // 1
  ```

  Aquí, `incrementar`, `obtenerCuenta` y `decrementar` son closures que "recuerdan" la variable `cuenta` del ámbito de `crearContador`.

- **Callbacks y Manejadores de Eventos:**
  Los callbacks, especialmente en operaciones asíncronas o manejadores de eventos, a menudo son closures.

  ```javascript
  function configurarBoton(mensaje) {
    const boton = document.createElement("button");
    boton.textContent = "Haz clic";
    document.body.appendChild(boton);

    // El callback del evento es un closure
    boton.addEventListener("click", function () {
      // 'mensaje' es accesible aquí gracias al closure,
      // incluso aunque configurarBoton ya haya terminado.
      alert(`Mensaje especial: ${mensaje}`);
    });
  }

  configurarBoton("¡Hola desde el closure!");
  configurarBoton("¡JavaScript es poderoso!");
  // Cada botón tendrá su propio 'mensaje' recordado.
  ```

  Otro ejemplo con `setTimeout`:

  ```javascript
  function saludarDespuesDe(segundos, nombre) {
    setTimeout(function () {
      // Este callback es un closure
      // Recuerda 'nombre' del ámbito de saludarDespuesDe
      console.log(`Hola, ${nombre}, después de ${segundos} segundos.`);
    }, segundos * 1000);
  }

  saludarDespuesDe(2, "Alice"); // Después de 2 segundos: Hola, Alice, después de 2 segundos.
  saludarDespuesDe(1, "Bob"); // Después de 1 segundo: Hola, Bob, después de 1 segundo.
  ```

- **Currying y Aplicación Parcial de Funciones (Avanzado):**
  Los closures son fundamentales para estas técnicas de programación funcional.

  ```javascript
  // Ejemplo simple de currying
  function multiplicar(a) {
    return function (b) {
      // Esta función interna es un closure
      return a * b;
    };
  }

  const duplicar = multiplicar(2); // 'a' se fija en 2 para 'duplicar'
  const triplicar = multiplicar(3); // 'a' se fija en 3 para 'triplicar'

  console.log(duplicar(5)); // 10 (2 * 5)
  console.log(triplicar(5)); // 15 (3 * 5)
  ```

### 4. Map y Set: Estructuras de Datos

#### a. Map

`Map` es una colección de pares clave-valor donde las claves pueden ser de cualquier tipo de dato (incluyendo objetos o funciones, no solo strings como en los objetos literales). Los `Map` recuerdan el orden original de inserción de las claves.

- **Creación y Métodos Principales:**

  ```javascript
  // Crear un Map vacío
  const miMapa = new Map();

  // Añadir elementos con set(clave, valor)
  const funcionClave = () => console.log("Soy una función clave");
  const objetoClave = { id: 1 };

  miMapa.set("nombre", "Producto A");
  miMapa.set(123, "Número de serie");
  miMapa.set(true, "Disponible");
  miMapa.set(objetoClave, { stock: 100, precio: 19.99 });
  miMapa.set(funcionClave, "Metadata de la función");

  console.log(miMapa);

  // Obtener un valor con get(clave)
  console.log(miMapa.get("nombre")); // Producto A
  console.log(miMapa.get(objetoClave)); // { stock: 100, precio: 19.99 }

  // Verificar si una clave existe con has(clave)
  console.log(miMapa.has(123)); // true
  console.log(miMapa.has("precio")); // false (no existe esa clave)

  // Eliminar un elemento con delete(clave)
  miMapa.delete(true);
  console.log(miMapa.has(true)); // false

  // Obtener el tamaño (número de elementos) con la propiedad size
  console.log(miMapa.size); // 4 (después de eliminar 'true')

  // Iterar sobre un Map
  console.log("Iterando con for...of (entries):");
  for (const [clave, valor] of miMapa) {
    console.log(clave, "=>", valor);
  }

  console.log("\nIterando con forEach:");
  miMapa.forEach((valor, clave) => {
    console.log(`${typeof clave} ${clave} -> ${JSON.stringify(valor)}`);
  });

  // Obtener solo claves
  console.log("\nClaves:");
  for (const clave of miMapa.keys()) {
    console.log(clave);
  }

  // Obtener solo valores
  console.log("\nValores:");
  for (const valor of miMapa.values()) {
    console.log(valor);
  }

  // Limpiar el Map con clear()
  // miMapa.clear();
  // console.log(miMapa.size); // 0

  // Crear un Map a partir de un array de arrays [clave, valor]
  const mapaInicializado = new Map([
    ["clave1", "valor1"],
    ["clave2", "valor2"],
  ]);
  console.log(mapaInicializado.get("clave1")); // valor1
  ```

- **Casos de Uso:**
  - Cuando se necesita que las claves no sean solo strings.
  - Para mantener el orden de inserción.
  - Para almacenar metadatos sobre objetos (usando los objetos como claves).
  - Cachés simples.

#### b. Set

`Set` es una colección de valores únicos, donde cada valor solo puede ocurrir una vez. Los valores pueden ser de cualquier tipo de dato. `Set` también recuerda el orden de inserción de los elementos.

- **Creación y Métodos Principales:**

  ```javascript
  // Crear un Set vacío
  const miSet = new Set();

  // Añadir elementos con add(valor)
  // add() devuelve el Set, permitiendo encadenamiento
  miSet.add(10);
  miSet.add("hola");
  miSet.add({ a: 1, b: 2 }); // Un objeto
  miSet.add(10); // Se ignora, ya existe el 10
  miSet.add("hola"); // Se ignora, ya existe "hola"

  const obj = { x: 5 };
  miSet.add(obj);
  miSet.add({ x: 5 }); // Se añade, porque es una *instancia* de objeto diferente

  console.log(miSet);

  // Verificar si un valor existe con has(valor)
  console.log(miSet.has(10)); // true
  console.log(miSet.has("mundo")); // false
  console.log(miSet.has(obj)); // true

  // Eliminar un elemento con delete(valor)
  miSet.delete("hola");
  console.log(miSet.has("hola")); // false

  // Obtener el tamaño (número de elementos) con la propiedad size
  console.log(miSet.size); // 4 (después de eliminar "hola")

  // Iterar sobre un Set
  console.log("Iterando con for...of:");
  for (const valor of miSet) {
    console.log(valor);
  }

  console.log("\nIterando con forEach:");
  // En forEach para Set, el primer y segundo argumento son el mismo (el valor),
  // para mantener consistencia con la firma de forEach de Map y Array.
  miSet.forEach((valor, valorOtraVez, setCompleto) => {
    console.log(valor);
  });

  // Limpiar el Set con clear()
  // miSet.clear();
  // console.log(miSet.size); // 0

  // Crear un Set a partir de un array (útil para eliminar duplicados)
  const numerosDuplicados = [1, 2, 2, 3, 4, 4, 4, 5, 1];
  const setDeNumeros = new Set(numerosDuplicados);
  console.log(setDeNumeros); // Set(5) { 1, 2, 3, 4, 5 }

  // Convertir un Set de nuevo a un Array
  const arraySinDuplicados = [...setDeNumeros];
  // o Array.from(setDeNumeros)
  console.log(arraySinDuplicados); // [1, 2, 3, 4, 5]
  ```

- **Casos de Uso:**
  - Eliminar elementos duplicados de un array.
  - Comprobar rápidamente la pertenencia de un elemento a una colección.
  - Almacenar una lista de elementos únicos sin preocuparse por duplicados.
