/////////////////////////////////////////////////
//// Nombre: Felipe Andres Agurto Henriquez  ////
/////////////////////////////////////////////////
////////////// Actividad N°3 ////////////////////
/////////////////////////////////////////////////

//Mostrar, por cada distribuidor, las comunas en las que se encuentra presente.

db.registros.aggregate([{ $group:{_id: "$distribuidor.nombre",comunas: { $addToSet: "$nombre_comuna"}}},{ $project: {_id: 0, distribuidor: "$_id", comunas: 1}}]);

//Mostrar la razón social, la comuna y el precio de todas las estaciones cuyo precio de la gasolina 93 sea menor a $1140.

db.registros.aggregate([{ $match: { "precios.gasolina 93": { $lt: 1140 } } },{ $project: {_id: 0,razon_social: 1,nombre_comuna: 1,precio_gasolina_93: "$precios.gasolina 93"}}]);


//Mostrar el precio promedio de la gasolina 95, agrupado por estación.

db.registros.aggregate([{ $group: {_id: "$razon_social",promedio_gasolina_95: { $avg: "$precios.gasolina 95" }}},{ $project: {_id: 0,estacion: "$_id",promedio_gasolina_95: 1}}]);


//Mostrar el precio promedio de la gasolina 97.

db.registros.aggregate([{ $group: {_id: 0,promedio_gasolina_97: { $avg: "$precios.gasolina 97" }}},{ $project: {_id: 0,promedio_gasolina_97: 1}}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////