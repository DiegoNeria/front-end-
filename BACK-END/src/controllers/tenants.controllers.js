const { Tenant } = require('../database/db')

const createTenant = async(req,res,next) =>{

    try {
        console.log(req.body)
		// desestructuracion
		const {name, lastName, email, userName, paymentMethodId, password } = req.body
		console.log(req.body)
        
        if (!name || !lastName || !email || !userName || !paymentMethodId || !password) {
            return res.status(400).send({
                status: "Petición incorrecta",
                mensaje: "Algunos datos han sido omitidos"
            });
        }

        const tenant = await Tenant.create({
            name: name,
            last_name: lastName,
            email: email,
            username: userName,
            payment_method_id: paymentMethodId,
            password: password
        });

        console.log(tenant)

        res.status(201).send({
            status: "Creado correctamente",
            message: "El tenant se creó correctamente"
        })
        
    } catch (error) {
        console.log(error)
		res.status(500).send({
			status: "ERROR DEL SERVIDOR",
			message: "Error",
			error: error
		})
    }
}
module.exports= {
    createTenant
}