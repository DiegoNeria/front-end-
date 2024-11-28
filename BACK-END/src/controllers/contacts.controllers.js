// Llamada a la bd 

const getAllContacts = async(req, res) => {
    try {
      	// Funcion que accede a la BD
      	res.status(200).send({
			status: "OK",
			message: "Obtenido correctamente",
			data : [
				{ "nombre": "José", "numero": 99972822},
				{ "nombre": "Juan", "numero": 44236587},
				{ "nombre": "niní", "numero": 44625357},
				{ "nombre": "Jose", "numero": 4489555357},
				{ "nombre": "Mariana", "numero": 44629407},

			]
      	})

    } catch (error) {
      	console.log(error)
		res.status(400).send({
			status: "NO SE OBTUVIERON CONTACTOS",
			message: "HUBO UN ERROR AL OBTENER LOS CONTACTOS",
			error: error
		})
    }
}

const createContact = async (req, res) => {
    try {
        console.log(req.body)
		// desestructuracion
		const { nombre, numero } = req.body
		console.log(nombre, numero)

        res.status(201).send({
			status: "se creo correctamente",
			message: "Contacto creado correctamente"
		})
    } catch (error) {
        console.log(error)
		res.status(400).send({
			status: "NO SE CREÓ EL CONTACTO",
			message: "CONTACTO NO CREADO",
			error: error
		})
    }
}

const getContact = async(req, res) => {
    try {
      	// EJECUTA ALGUNA FUNCION
		console.log(req.params)
		//desestructuracion
		const { id } = req.params
		console.log(id)

		res.status(200).send({
			status: "OBTENIDO CORRECTAMENTE",
			message: "CONTACTO RECIBIDO",
			data: { "nombre": "José", "numero": 99972822}
		})

    } catch (error) {
		res.status(400).send({
			status: "NO existe el contacto",
			message: "Contacto Inexistente",
			error: error
		})
    }
}

const findContact = async(req, res) => {
    try {
		// Funcion que contecta a la BD
		console.log(req.query)

		res.status(200).send({
			status: "Contatos encontrados",
			message: "Todos los contactos encontrados con esos queries",
			data: [
				{ "nombre": "Andrés", "numero": 9927828991 },
				{ "nombre": "Ann", "numero": 878282728 },
				{ "nombre": "Antonio", "numero": 224635455}
			]
		})
    } catch (error) {
		res.status(400).send({
			status: "Contactos no encontrados",
			message: "No se encontraron contactos",
			error: error
		})
    }
}

module.exports = {
    createContact,
    getContact,
    findContact,
    getAllContacts
}