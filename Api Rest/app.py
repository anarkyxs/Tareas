# Nombre: Felipe Andrés Agurto Henríquez

from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
import json
from productos import datos_base  # Importar los datos base desde productos.py


# Creación de la aplicación Flask
app = Flask(__name__)

# Conexión al cliente de MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Selección de la base de datos
db = client['apirest']

# Función para agregar los datos base al servidor
def agregar_datos_base():
    collection = db['apirest_collection']
    collection.insert_many(datos_base)

# Llamada a la función para agregar los datos base
agregar_datos_base()



# Función personalizada para convertir ObjectId a cadena en la respuesta JSON
def jsonify_with_objectid(data):

    def convert(o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, list):
            return [convert(item) for item in o]
        elif isinstance(o, dict):
            return {key: convert(value) for key, value in o.items()}
        return o

    return app.response_class(
        response=json.dumps(convert(data)),
        status=200,
        mimetype='application/json'
    )

# API REST

# GET (Recupera datos del servidor)
@app.route('/api', methods=['GET'])
@app.route('/api/<path:query>', methods=['GET'])
def get_data(query=None):
    # Selección de la colección
    collection = db['apirest_collection']

    if query is None:
        # Si no se proporciona ningún parámetro de consulta, mostrar todos los datos
        data = list(collection.find())
    elif ObjectId.is_valid(query):
        # Si el parámetro de consulta es un ID válido, buscar por ID
        data = collection.find_one({'_id': ObjectId(query)})
        if data:
            # Devolver la respuesta JSON con ObjectId convertido a cadena
            return jsonify_with_objectid({'_id': data['_id'], 'data': data})
        else:
            return jsonify({'message': 'No se encontró ningún dato con el ID proporcionado'})
    else:
        # Si el parámetro de consulta no es un ID válido, buscar por nombre de producto
        data = list(collection.find({'producto': query}))

    if data:
        # Convertir ObjectId a cadena en cada documento
        converted_data = []
        for item in data:
            item['_id'] = str(item['_id'])
            converted_data.append(item)
        return jsonify(converted_data)
    else:
        return jsonify({'message': 'No se encontraron datos con el parámetro de consulta proporcionado'})


# POST (Crea un nuevo recurso en el servidor)
@app.route('/api', methods=['POST'])
def create_data():
    # Selección de la colección
    collection = db['apirest_collection']
    # Obtener los datos enviados en la solicitud
    new_data = request.get_json()
    # Insertar los nuevos datos en la colección
    collection.insert_one(new_data)
    return jsonify({'message': 'Datos Agregado a la Base de Datos'})


# PUT (Actualiza completamente un recurso existente en el servidor)
@app.route('/api/<string:id>', methods=['PUT'])
def update_data(id):
    # Selección de la colección
    collection = db['apirest_collection']
    # Obtener los datos actualizados enviados en la solicitud
    updated_data = request.get_json()
    # Actualizar los datos en la colección usando el ID proporcionado
    collection.update_one({'_id': ObjectId(id)}, {'$set': updated_data})
    return jsonify({'message': 'Datos actualizados'})


# PATCH (Actualiza parcialmente un recurso existente en el servidor)
@app.route('/api/<string:id>', methods=['PATCH'])
def partial_update_data(id):
    # Selección de la colección
    collection = db['apirest_collection']
    # Obtener los campos actualizados enviados en la solicitud
    updated_fields = request.get_json()
    # Actualizar parcialmente los datos en la colección usando el ID proporcionado
    collection.update_one({'_id': ObjectId(id)}, {'$set': updated_fields})
    return jsonify({'message': 'Datos parcialmente actualizados'})


# DELETE (Elimina un recurso existente en el servidor)
@app.route('/api/<string:id>', methods=['DELETE'])
def delete_data(id):
    # Selección de la colección
    collection = db['apirest_collection']
    # Eliminar los datos de la colección usando el ID proporcionado
    collection.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Datos eliminados'})


# Punto de entrada para ejecutar la aplicación Flask en modo de depuración
if __name__ == '__main__':
    app.run(debug=True)
