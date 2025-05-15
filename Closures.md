# 🧠 Entendiendo Closures en JavaScript

Los **closures** (cierres) son un concepto fundamental en JavaScript que permite a las funciones "recordar" el entorno donde fueron creadas, incluso cuando se ejecutan fuera de ese contexto.

## 📌 ¿Qué es un Closure?

Un closure es una función que:

1. Accede a variables de su ámbito externo (donde fue creada)
2. **Sigue teniendo acceso** a esas variables incluso después de que el ámbito externo haya terminado de ejecutarse

```javascript
function exterior() {
  let mensaje = "Hola"; // Variable del ámbito exterior

  function interior() {
    console.log(mensaje); // Accede a la variable del ámbito exterior
  }

  return interior; // Retornamos la función (no su ejecución)
}

const miFuncion = exterior();
miFuncion(); // Imprime "Hola" ← ¡El closure recuerda 'mensaje'!
```

## 🔍 ¿Cómo Funciona?

1. Cuando una función **interior** accede a variables de una función **exterior**
2. JavaScript "cierra" (closure) esas variables junto con la función interior
3. Así la función interior puede usarlas incluso después

## 🛠 Ejemplos Prácticos

### 1. Contador con Estado Privado

```javascript
function crearContador() {
  let contador = 0; // Estado privado

  return {
    incrementar: function () {
      contador++;
      return contador;
    },
    decrementar: function () {
      contador--;
      return contador;
    },
    obtenerValor: function () {
      return contador;
    },
  };
}

const contador = crearContador();
console.log(contador.incrementar()); // 1
console.log(contador.incrementar()); // 2
console.log(contador.decrementar()); // 1
console.log(contador.obtenerValor()); // 1
```

### 2. Factory de Funciones

```javascript
function crearMultiplicador(factor) {
  return function (numero) {
    return numero * factor; // Recuerda el 'factor'
  };
}

const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);

console.log(doble(5)); // 10
console.log(triple(5)); // 15
```

### 3. Callbacks en Eventos

```javascript
function configurarBoton(id) {
  const boton = document.getElementById(id);
  let clicks = 0;

  boton.addEventListener("click", function () {
    clicks++;
    console.log(`Botón ${id} clickeado ${clicks} veces`);
  });
}

configurarBoton("miBoton");
// Cada click incrementará su propio contador
```

## 💡 ¿Por qué son importantes?

- **Encapsulamiento**: Permiten variables "privadas"
- **Patrones de diseño**: Factories, módulos, memoization
- **Manejo de estado**: En callbacks y eventos
- **Currying**: Funciones que transforman otras funciones

## ⚠️ Consideraciones

1. **Consumo de memoria**: Los closures mantienen referencias a sus variables
2. **Uso en bucles**:

```javascript
// Problema común
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // Siempre imprime 3 (solución: usar let o closure adicional)
  }, 100);
}

// Solución con closure
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i);
}
```

## 🎯 Conclusión

Los closures son poderosos porque permiten:

- Mantener estado entre llamadas de función
- Crear funciones especializadas
- Implementar patrones de programación avanzados

¡Dominar los closures es clave para escribir JavaScript profesional!
