const { Tenant } = require('../database/db')

const login =async(req,res,next) =>{

    try {
        console.log(req.body)
		// desestructuracion
		const {username, password } = req.body
		console.log(username, password)
        
        const tenant = await Tenant.findOne({
            where: {
                username: username,
                password: password
            },
            attributes: ['username', 'password']
        });

        console.log(tenant)

        if (tenant) {
            res.status(200).send({
                status: "Acceso válido",
                message: "Las credenciales coinciden"
            })
        } else {
            res.status(403).send({
                status: "Acceso denegado",
                message: "Las credenciales no coinciden"
            })
        }
        
    } catch (error) {
        console.log(error)
		res.status(500).send({
			status: "ERROR DEL SERVIDOR",
			message: "Error",
			error: error
		})
    }
}
module.exports = {
    login
}