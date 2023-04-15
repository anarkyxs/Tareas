/////////////////////////////////////////////////
//// Nombre: Felipe Andres Agurto Henriquez  ////
/////////////////////////////////////////////////
////////////// Actividad N°2 ////////////////////
/////////////////////////////////////////////////

//a. Mostrar las 5 primeras personas, indicando solo su first y last name.

db.getCollection("personas").find({}, {"_id":0,"name.first": 1, "name.last": 1}).limit(5)

//b. Mostrar las 5 primeras personas cuyo género sea femenino.

db.getCollection("personas").find({gender: "female"}).limit(5)

//c. Mostrar las personas cuya edad de registro se encuentre entre 1 y 10.

db.getCollection("personas").find({"registered.age": {$gte: 1, $lte: 10}})

//d. Mostrar las personas cuya ciudad sea devonport o amiens

db.getCollection("personas").find({"location.city": {$in: ["devonport", "amiens"]}})

//e. Modificar la ciudad a Santiago de la persona con nombre ethan y apellido denis

db.getCollection("personas").updateOne({"name.first": "ethan", "name.last": "denis"}, {$set: {"location.city": "Santiago"}})

//f. Modificar la password a 123456 de la persona cuyo username sea blackbutterfly232

db.getCollection("personas").updateOne({"login.username": "blackbutterfly232"}, {$set: {"login.password": "123456"}})

//g. Mostrar las personas cuya nacionalodad (nat) sea FR y su edad (de la propiedad dob) se encuentre entre 50 y 70.

db.getCollection("personas").find({nat: "FR", "dob.age": {$gte: 50, $lte: 70}})

//h. Eliminar las personas cuyo estado sea nordjylland o wicklow

db.getCollection("personas").deleteMany({"location.state": {$in: ["nordjylland", "wicklow"]}})

//i. Mostrar el género, nombre y nacionalidad (nat) de todas las personas cuya nacionalidad (nat) sea CH o CA, su género sea 
// masculino y cuyo título (title) sea monsieu

db.getCollection("personas").find({nat: {$in:["CH", "CA"]}, gender:"male", "name.title":"monsieur"}, {_id:0, gender:1, name:1, nat:1})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////