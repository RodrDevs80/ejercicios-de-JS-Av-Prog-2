/*Ejercicio 1: Gestor de Tareas Mejorado

Crea un gestor de tareas que utilice `Map` para almacenar las tareas, donde la clave sea un ID único y el valor sea un objeto de tarea. Cada tarea tendrá `id`, `descripcion`, `completada` (booleano) y un `Set` de `etiquetas`.

Implementa las siguientes funciones:

1.  `agregarTarea({ id, descripcion,completado, etiquetas = [] })`:
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
 */

const gestorDeTareas = () => {
  const tareas = new Map();
  return {
    agregarTarea: function ({ id, descripcion, completado = false, nameEtiquetas = [] }) {
      try {
        if (!tareas.has(id)) {
          const tareaAAgregar = {
            id,
            descripcion,
            completado,
            etiquetas: new Set(nameEtiquetas)
          }
          tareas.set(tareas.size + 1, tareaAAgregar);
          console.log(`Se agrego la tarea de manera exitosa ✅`)
        } else {
          throw new Error(`La tarea con el id ${id} ya existe ❌`);
        }
      } catch (err) {
        console.error(err.message);
      }


    },
    marcarCompletada: function (id) {
      try {
        if (tareas.has(id)) {
          tareas.forEach((tarea, _) => {
            if (tarea.id === id) {
              tarea.completado = true;
            }
          })
        } else {
          throw new Error(`La tarea con el id ${id} no existe ❌`);
        }
      } catch (err) {
        console.error(err.message);
      }

    },
    obtenerTareasPorEtiqueta: function (etiqueta) {
      const tareasByEtiqueta = [];

      tareas.forEach((tarea, _) => {
        tarea.etiquetas.forEach(etiq => {
          if (etiq === etiqueta) {
            tareasByEtiqueta.push(tarea);
          }
        })
      })

      return tareasByEtiqueta.length === 0 ? "No se encontró la etiqueta buscada ❌" : tareasByEtiqueta;
    },
    obtenerResumenTareas: function () {
      const total = tareas.size;
      let completadas = 0;
      let pendientes = 0;
      tareas.forEach((tarea, _) => tarea.completado ? completadas = completadas + 1 : pendientes = pendientes + 1)
      return { total, completadas, pendientes };
    },
    getTareas: function () {
      return tareas;
    },
    getTareaById: function (id) {
      return tareas.get(id);
    }
  }
}

const nuevaTarea1 = { id: 1, descripcion: "Realizar Ejercicios", nameEtiquetas: ["Programación 2", "IS Santa Rosa", "programación"] }
const nuevaTarea2 = { id: 2, descripcion: "Realizar API Logística", completado: true, nameEtiquetas: ["Desarrollo de Software", "IS Santa Rosa"] }
const nuevaTarea3 = { id: 2, descripcion: "Practicas de Ingles", nameEtiquetas: ["Ingles 2", "developer"] }
const nuevaTarea4 = { id: 4, descripcion: "Realizar prácticos JS avanzado", nameEtiquetas: ["Programación 2", "developer", "programación"] }

const newGestorTareas = gestorDeTareas();
console.log("******Agregando Tareas********")
newGestorTareas.agregarTarea(nuevaTarea1);
newGestorTareas.agregarTarea(nuevaTarea2);
newGestorTareas.agregarTarea(nuevaTarea3);
newGestorTareas.agregarTarea(nuevaTarea4);
console.log("******Completando Tareas********")
newGestorTareas.marcarCompletada(1);
console.log(newGestorTareas.getTareaById(1));
newGestorTareas.marcarCompletada(10);
console.log("************************************")
console.log("******obtener Resumen Tareas********")
console.log("Las tareas por etiquetas son: ", newGestorTareas.obtenerTareasPorEtiqueta("IS Santa Rosa"));
console.log("Las tareas por etiquetas son: ", newGestorTareas.obtenerTareasPorEtiqueta("programación"));
console.log("Las tareas por etiquetas son: ", newGestorTareas.obtenerTareasPorEtiqueta("ventas online"));
console.log("*********Resumen Tareas************")
const { total, completadas, pendientes } = newGestorTareas.obtenerResumenTareas();
console.log(`Resumen de tareas: \n Total: ${total} 🧮 \n Completadas: ${completadas} ✅\n Pendientes: ${pendientes} ❌`)
console.log("************************************")
console.log("ver: ", newGestorTareas.getTareas());

