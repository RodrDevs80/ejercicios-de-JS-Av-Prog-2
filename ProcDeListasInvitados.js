/**
Ejercicio 2: Procesador de Listas de Invitados

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
 */
const lista1 = [
    "Juan Pérez",
    "María García",
    "Carlos López",
    "Ana Martínez",
    "Luis Rodríguez",
    "Sofía Hernández",
    "Pedro Sánchez",
    "Laura Díaz"
];
const lista2 = [
    "Juan Pérez",       // Repetido
    "María García",     // Repetido
    "Daniel Jiménez",
    "Elena Castro",
    "Carlos López",     // Repetido
    "Mónica Ruiz",
    "Ricardo Mora",
    "Patricia Vargas",
    "Ana Martínez",     // Repetido
    "Fernando Reyes",
    "Lucía Mendoza",
    "Sofía Hernández",  // Repetido
    "Oscar Torres",
    "Gabriela Silva",
    "Laura Díaz"        // Repetido
];

const procesarListas = (...listasDeNombres) => {
    //1.  Combinar todas las listas en una sola.
    const listasUnica = [...listasDeNombres].flat();
    //2.Eliminar nombres duplicados (cada invitado debe aparecer solo una vez).
    const listaSinDuplicados = new Set(listasUnica);
    /* Devolver un objeto con dos propiedades:
    - `invitadosUnicos`: Un `Set` con los nombres únicos de los invitados.
    - `conteoTotalInvitados`: El número total de nombres recibidos antes de la deduplicación.
    - `conteoInvitadosUnicos`: El número de invitados únicos. */
    return { invitadosUnicos: listaSinDuplicados, conteoTotalInvitados: listasUnica.length, conteoInvitadosUnicos: listaSinDuplicados.size }
}

const { invitadosUnicos, conteoTotalInvitados, conteoInvitadosUnicos } = procesarListas(lista1, lista2);
console.log("Listado de invitados sin duplicados: ");
console.log(invitadosUnicos);
console.log("Conteo Total de Invitados: ");
console.log(conteoTotalInvitados);
console.log("Conteo de Invitados sin duplicados: ");
console.log(conteoInvitadosUnicos);