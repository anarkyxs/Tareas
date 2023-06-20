/////////////////////////////////////////////////
//// Nombre: Felipe Andres Agurto Henriquez  ////
/////////////////////////////////////////////////
////////////// Actividad N°5 ////////////////////
/////////////////////////////////////////////////


db.cliente.aggregate([
  {
    $lookup: {
      from: "pedidos",
      localField: "_id",
      foreignField: "cliente",
      as: "pedidos"
    }
  },
  {
    $unwind: "$pedidos"
  },
  {
    $lookup: {
      from: "productos",
      localField: "pedidos.productos.producto",
      foreignField: "_id",
      as: "productos"
    }
  },
  {
    $group: {
      _id: "$nombre",
      productos: {
        $push: {
          $map: {
            input: "$productos",
            as: "producto",
            in: "$$producto.nombre"
          }
        }
      }
    }
  }
]);

//////////////////////////////////////////////////////////////////