/*Ejercicio 4: Registro de Eventos con Timestamps Únicos
Crea un sistema para registrar eventos. Cada evento debe tener un timestamp como clave y una descripción como valor.
1.  Usa un `Map` para almacenar los eventos.
2.  Crea una función `registrarEvento(descripción)`:
    - Debe generar un timestamp (puedes usar `Date.now()`).
    - Para asegurar la unicidad del timestamp como clave (en caso de llamadas muy rápidas), si el timestamp ya existe en el `Map`, intenta con el siguiente milisegundo hasta encontrar uno libre.
    - Guarda el evento en el `Map`.
3.  Crea una función `obtenerEventosEntre({ inicio, fin })` que use desestructuración para los parámetros `inicio` y `fin` (timestamps). Debe devolver un array de objetos `{ timestamp, descripción }` para los eventos dentro de ese rango.
**Pistas:**
- Un `while` loop puede ser útil para encontrar un timestamp único.
- Para `obtenerEventosEntre`, itera sobre las claves (timestamps) del `Map`.
*/
const eventos = new Map();

const registrarEvento = (descripción) => {
    let timestamp = Date.now();
    while (eventos.has(timestamp)) {
        timestamp = Date.now();
    }
    eventos.set(timestamp, descripción);
    return timestamp;
}

const obtenerEventosEntre = ({ inicio, fin }) => {
    const eventosEnRango = [];
    console.log(`Inicio: ${inicio}- Fin: ${fin}`)
    eventos.forEach((evento, key) => {
        if (key >= inicio && key <= fin) {
            eventosEnRango.push({ timestamp: key, descripcion: evento });
        }
    });
    return eventosEnRango;
}

const time1 = registrarEvento("Encendido sin anomalías");
const time2 = registrarEvento("Apagado repentino");
const time3 = registrarEvento("Reinicio inesperado");
const time4 = registrarEvento("Fallo de sistema");
const time5 = registrarEvento("La operación se completó correctamente");
const time6 = registrarEvento("La migración de nivel inferior sin conexión se realizó correctamente");

console.log("***********Todos los eventos*************")
console.log(eventos);
console.log("************Eventos en Rango**************");
console.log("1° Rango")
console.log(obtenerEventosEntre({ inicio: time3, fin: time5 }));
console.log("2° Rango")
console.log(obtenerEventosEntre({ inicio: time1, fin: time2 }));