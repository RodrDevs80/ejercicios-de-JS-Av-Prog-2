/* Ejercicio 5: Transformador de Datos de API
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
 */

const datosApi = [
  {
    id: 1,
    nombre_completo: "Ana Pérez",
    email: "ana.perez@example.com",
    detalles: {
      edad: 30,
      pais_residencia: "ES"
    }
  },
  {
    id: 2,
    nombre_completo: "Carlos Gómez",
    email: "carlos.gomez@example.com",
    detalles: {
      edad: 25,
      pais_residencia: "MX"
    }
  },
  {
    id: 3,
    nombre_completo: "María Rodríguez",
    email: "maria.rodriguez@example.com",
    detalles: {
      edad: 28,
      pais_residencia: "AR"
    }
  },
  {
    id: 4,
    nombre_completo: "Juan Martínez",
    email: "juan.martinez@example.com",
    detalles: {
      edad: 35,
      pais_residencia: "CO"
    }
  },
  {
    id: 5,
    nombre_completo: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    detalles: {
      edad: 22,
      pais_residencia: "ES"
    }
  },
  {
    id: 6,
    nombre_completo: "Pedro Sánchez",
    email: "pedro.sanchez@example.com",
    detalles: {
      edad: 40,
      pais_residencia: "CL"
    }
  },
  {
    id: 7,
    nombre_completo: "Sofía Ruiz",
    email: "sofia.ruiz@example.com",
    detalles: {
      edad: 29,
      pais_residencia: "PE"
    }
  },
  {
    id: 8,
    nombre_completo: "David López",
    email: "david.lopez@example.com",
    detalles: {
      edad: 31,
      pais_residencia: "ES"
    }
  }
];

const transformarYAgruparUsuarios = (usuariosApi, ...propiedadesAdicionales) => {
  const usuariosTransformados = [];
  let usuarioTransformado;
  const usuariosPorPais = new Map();

  const incluyePais = propiedadesAdicionales.includes('pais_residencia');

  usuariosApi.forEach((usuario) => {
    usuarioTransformado = {
      userId: usuario.id,
      nombre: usuario.nombre_completo.split(" ")[0],
      email: usuario.email,
    }
    propiedadesAdicionales.forEach(propiedad => {
      if (usuario.detalles[propiedad] !== undefined) {
        usuarioTransformado[propiedad] = usuario.detalles[propiedad];
      }
    })
    usuariosTransformados.push(usuarioTransformado)
  })


  if (incluyePais) {
    usuariosTransformados.forEach((usuario) => {
      if (!usuariosPorPais.has(usuario.pais_residencia)) {
        usuariosPorPais.set(usuario.pais_residencia, new Set().add(usuario.userId));
      } else {
        usuariosPorPais.get(usuario.pais_residencia).add(usuario.userId);
      }
    })
  }

  return { usuariosTransformados, usuariosPorPais }
}


const { usuariosTransformados, usuariosPorPais } = transformarYAgruparUsuarios(datosApi, 'edad', 'pais_residencia');
console.log("*********************************************");
console.log(usuariosTransformados);
console.log("*********************************************");
console.log(usuariosPorPais);
