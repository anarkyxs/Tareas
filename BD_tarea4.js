/////////////////////////////////////////////////
//// Nombre: Felipe Andres Agurto Henriquez  ////
/////////////////////////////////////////////////
////////////// Actividad N°4 ////////////////////
/////////////////////////////////////////////////

///////////////////////////////////////////////
/////////////////Actividad 4.1/////////////////
///////////////////////////////////////////////
//a. Eliminar al usuario cuyo username sea Antonette:
db.usuarios.deleteOne({username: "Antonette"})

//b. Eliminar al usuario cuyo username sea Bartholomebury:
db.usuarios.deleteOne({username: "Bartholomebury"})

//c. Agregar una columna llamada salary y asignarle el valor 2000 a todos aquellos usuarios 
//cuyo nombre de compañía inicie con la letra R (sin importar que se escriba en mayúscula o minúscula):
db.usuarios.updateMany(
    { "company.name": { $regex: /^r/i } },
    { $set: { salary: 2000 } }
)

//d. Eliminar la columna catchPhrase (se encuentra dentro de company) de todos los usuarios cuyo nombre de compañía comience con la letra c (sin distinguir entre mayúscula o minúscula):
db.usuarios.updateMany(
    { "company.name": { $regex: /^c/i } },
    { $unset: { "company.catchPhrase": "" } }
)

//e. A todos los usuarios que trabajan en una compañía que inicie con la letra R (sin importar que se escriba con mayúscula o minúscula) aumentar el sueldo en un 8%:
db.usuarios.updateMany(
    { "company.name": { $regex: /^r/i } },
    { $mul: { salary: 1.08 } }
)

///////////////////////////////////////////////
/////////////////Actividad 4.2/////////////////
///////////////////////////////////////////////

//a. Crear un índice único para la columna username
db.usuarios.createIndex({username: 1}, {unique: true})


//b. Crear índices para las columnas company.name y address.street
db.usuarios.createIndex({"company.name": 1})
db.usuarios.createIndex({"address.street": 1})

//c. Añadir un documento y comprobar que no permita ingresar un mismo usermane (no es 
//obligación ingresar las mismas cantidades de columnas).
db.usuarios.insertOne({
    "id": 101,
    "name": "Belle Delphine",
    "username": "Delphine",
    "email": "Belle@gmail.com",
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
    },
    "phone": "555-555-1212",
    "website": "belle.com",
    "company": {
        "name": "ABC Inc",
        "catchPhrase": "Lorem ipsum",
        "bs": "Dolor sit amet"
    }
})

//d. Realizar una consulta que muestre todas los nombres de empresas que inicien con la letra 
//c|k y el nombre de la calle contenga la letra o en cualquier lugar (debe mostrar estadística 
//de documentos consultados).
db.usuarios.find({
    $and: [
        { "company.name": { $regex: /^[ck]/i } },
        { "address.street": { $regex: /o/i } }
    ]
}).projection({ "company.name": 1, "address.street": 1 }).explain("executionStats")



///////////////////////////////////////////////
/////////////////Actividad 4.3/////////////////
///////////////////////////////////////////////

//a. Mostrar la cantidad de sesiones agrupadas por nombre
db.sesiones.aggregate([
  {
    $group: {
      _id: "$nombre",
      sesiones: { $count: {} }
    }
  }
])


//b. Mostrar el total de kilómetros que ha recorrido cada persona en orden ascendente.
db.sesiones.aggregate([
  {
    $group: {
      _id: "$nombre",
      total_km: { $sum: "$distKm" }
    }
  },
  {
    $sort: { total_km: 1 }
  }
])


//c. Mostrar la cantidad de kilómetros de cada persona por mes
db.sesiones.aggregate([
  {
    $group: {
      _id: { nombre: "$nombre", mes: "$mes" },
      total_km: { $sum: "$distKm" }
    }
  }
])


//d. Mostrar el promedio de tiempo de cada persona.
db.sesiones.aggregate([
  {
    $group: {
      _id: "$nombre",
      promedioTiempo: { $avg: "$tiempoMin" }
    }
  }
])


//e. Mostrar la distancia máxima y mínima de cada persona.
db.sesiones.aggregate([
  {
    $group: {
      _id: "$nombre",
      distanciaMaxima: { $max: "$distKm" },
      distanciaMinima: { $min: "$distKm" }
    }
  }
])


