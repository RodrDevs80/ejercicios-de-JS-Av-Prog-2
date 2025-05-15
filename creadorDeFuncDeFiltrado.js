/**Ejercicio 3: Creador de Funciones de Filtrado
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
 */
const invitados = [
    { nombre: "Ana", ciudad: "Madrid" },
    { nombre: "Luis", ciudad: "Barcelona" },
    { nombre: "Carlos", ciudad: "Valencia" },
    { nombre: "María", ciudad: "Sevilla" },
    { nombre: "Pedro", ciudad: "Madrid" },
    { nombre: "Sofía", ciudad: "Bilbao" },
    { nombre: "Ana", ciudad: "Málaga" },
    { nombre: "Javier", ciudad: "Barcelona" },
    { nombre: "Lucía", ciudad: "Zaragoza" },
    { nombre: "Luis", ciudad: "Valencia" }
];


const crearFiltroPorPropiedad = (nombrePropiedad) => {
    try {
        if (nombrePropiedad === "ciudad") {
            return {
                filtrarPorCiudad: function (nombreCiudad, list) {
                    return list.filter((invitado) => invitado.ciudad.toLowerCase() === nombreCiudad.toLowerCase());
                }
            }
        } else if (nombrePropiedad === "nombre") {
            return {
                filtrarPorNombre: function (nombrePersona, list) {
                    return list.filter((invitado) => invitado.nombre.toLowerCase() === nombrePersona.toLowerCase());
                }
            }
        } else {
            throw new Error("El objeto no tiene la propiedad solicitada!❌");
        }
    } catch (err) {
        console.error(err.message);
    }

}
//creo filtro por ciudad
const filtrarPorCiudad = crearFiltroPorPropiedad("ciudad");
console.log("Invitados residentes en Madrid");
const residentesMadrid = filtrarPorCiudad.filtrarPorCiudad("madrid", invitados);
console.log(residentesMadrid);
console.log("Invitados residentes en Barcelona");
const residentesBarcelona = filtrarPorCiudad.filtrarPorCiudad("Barcelona", invitados);
console.log(residentesBarcelona);
//creo filtro por nombre
const filtrarPorNombre = crearFiltroPorPropiedad("nombre");
console.log("Invitados con nombre Ana");
const invitadosConNombreAna = filtrarPorNombre.filtrarPorNombre("ana", invitados);
console.log(invitadosConNombreAna)
console.log("Invitados con nombre Luis");
const invitadosConNombreLuis = filtrarPorNombre.filtrarPorNombre("luis", invitados);
console.log(invitadosConNombreLuis);



//version refactorizada
console.log("Version Refactorizada")
const crearFiltroPorPropiedadM = (nombrePropiedad) => {
    return (valorEsperado, lista) => {
        return lista.filter(
            (objeto) => objeto[nombrePropiedad].toLowerCase() === valorEsperado.toLowerCase()
        );
    };
};

const filtrarPorCiudad1 = crearFiltroPorPropiedadM("ciudad");
const residentesMadrid1 = filtrarPorCiudad1("madrid", invitados);
console.log("Invitados en Madrid:", residentesMadrid1);

const filtrarPorNombre1 = crearFiltroPorPropiedadM("nombre");
const invitadosAna = filtrarPorNombre1("ana", invitados);
console.log("Invitados llamados Ana:", invitadosAna);

