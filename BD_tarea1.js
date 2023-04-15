// Nombre: Felipe Andres Agurto Henriquez
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ejercicio N°1
// 1: Crear la base de datos y las colecciones
use tienda
db.createCollection("clientes")
db.createCollection("productos")

// 2a: Mostrar todas las bases de datos
show dbs

// 2b: Chequear la base de datos seleccionada
db

// 2c: Ver las colecciones de la base de datos seleccionada
show collections

// 2d: Visualizar la ayuda de la colección clientes
db.clientes.help()

// 3: Eliminar todas las colecciones
db.clientes.drop()
db.productos.drop()

// 4: Eliminar la base de datos tienda
db.dropDatabase()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ejercicio N°2
// 1: Crear la base de datos, colección y un documento
use transporte
db.createCollection("pasajes")
db.pasajes.insertOne({
  codPasaje: 1,
  rutPasajero: "11.111.111-1",
  origen: "Santiago",
  destino: "Valparaíso",
  numAsiento: 10,
  precio: 5000
})

// 2a: Insertar tres documentos usando insert
db.pasajes.insert({
  codPasaje: 2,
  rutPasajero: "22.222.222-2",
  origen: "Concepción",
  destino: "Santiago",
  numAsiento: 20,
  precio: 8000
})
db.pasajes.insert({
  codPasaje: 3,
  rutPasajero: "33.333.333-3",
  origen: "Valdivia",
  destino: "Osorno",
  numAsiento: 30,
  precio: 6000
})
db.pasajes.insert({
  codPasaje: 4,
  rutPasajero: "44.444.444-4",
  origen: "Iquique",
  destino: "Arica",
  numAsiento: 40,
  precio: 10000
})

// 2b: Insertar tres documentos usando insertOne
db.pasajes.insertOne({
  codPasaje: 5,
  rutPasajero: "55.555.555-5",
  origen: "La Serena",
  destino: "Coquimbo",
  numAsiento: 50,
  precio: 4000
})
db.pasajes.insertOne({
  codPasaje: 6,
  rutPasajero: "66.666.666-6",
  origen: "Temuco",
  destino: "Pucón",
  numAsiento: 60,
  precio: 7000
})
db.pasajes.insertOne({
  codPasaje: 7,
  rutPasajero: "77.777.777-7",
  origen: "Viña del Mar",
  destino: "Valparaíso",
  numAsiento: 70,
  precio: 2000
})

// 2c: Insertar tres documentos usando insertMany
db.pasajes.insertMany([
  {
    codPasaje: 8,
    rutPasajero: "88.888.888-8",
    origen: "Arica",
    destino: "Iquique",
    numAsiento: 80,
    precio: 12000
  },
  {
    codPasaje: 9,
    rutPasajero: "99.999.999-9",
    origen: "Puerto Montt",
    destino: "Puerto Varas",
    numAsiento: 90,
    precio: 3000
  },
  {
    codPasaje: 10,
    rutPasajero: "10.111.111-0",
    origen: "Santiago",
    destino: "Viña del Mar",
    numAsiento: 100,
    precio: 6000
  }
])

// 3: Listar los documentos insertados
db.pasajes.find().forEach(printjson)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ejercicio N°3
// 1: Crear la base de datos y la colección
use farmacia
db.createCollection("medicamentos")

// 2: Insertar los documentos
db.medicamentos.insertMany([
   {
      nombre: "Sertal",
      laboratorio: "Roche",
      precio: 5.2,
      cantidad: 100
   },
   {
      nombre: "Buscapina",
      laboratorio: "Roche",
      precio: 4.10,
      cantidad: 200
   },
   {
      nombre: "Amoxidal 500",
      laboratorio: "Bayer",
      precio: 15.60,
      cantidad: 100
   },
   {
      nombre: "Paracetamol 500",
      laboratorio: "Bago",
      precio: 1.90,
      cantidad: 200
   },
   {
      nombre: "Bayaspirina",
      laboratorio: "Bayer",
      precio: 2.10,
      cantidad: 150
   },
   {
      nombre: "Amoxidal jarabe",
      laboratorio: "Bayer",
      precio: 5.10,
      cantidad: 50
   }
])

// 3: Seleccionar todos los medicamentos
db.medicamentos.find()

// 4: Seleccionar todos los medicamentos cuyo laboratorio sea Roche
db.medicamentos.find({ laboratorio: "Roche" })

// 5: Seleccionar todos los medicamentos cuyo laboratorio NO sea Bayer
db.medicamentos.find({ laboratorio: { $ne: "Bayer" } })

// 6: Seleccionar todos los medicamentos cuya cantidad sea mayor a 100
db.medicamentos.find({ cantidad: { $gt: 100 } })

// 7: Eliminar todos los medicamentos cuyo laboratorio sea Bayer
db.medicamentos.deleteMany({ laboratorio: "Bayer" })

// 8: Actualizar la cantidad a 200, para todos los medicamentos cuyo laboratorio sea Roche
db.medicamentos.updateMany({ laboratorio: "Roche" }, { $set: { cantidad: 200 } })

// 9: Borrar todos los medicamentos
db.medicamentos.drop()

// 10: Eliminar la base de datos farmacia
db.dropDatabase()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
