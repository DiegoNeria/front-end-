const { User } = require('../database/db');

//PORQUE ASYNC?
//BUSQUEDA ESPECIFICA
//user.findall({where: {firstName: "Renata"}})
const getUser =  (req,res) => {
    User.findAll()
    .then((users) => {
        res.send(users);
    })
    .catch((err) => {
        console.log(err);
    });
};

const createUser = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { firstName, lastName, photo, email, username, password, tenant_id } = req.body;

        // Crear el usuario con los datos recibidos
        const user = await User.create({
            firstName,
            lastName,
            photo,
            email,
            username,
            password,
            tenant_id
        });

        res.status(201).send({
            status: "se creo correctamente",
            message: "usuario creado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "NO SE CREÓ EL usuario",
            message: "usuario NO CREADO",
            error: error
        });
    }
};

   

const deleteUser = async (req,res) => {
    const {id} = req.params;
    User.destroy({where: {id}});
    res.send("delete");
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, photo, email, username, password } = req.body; // Desestructurar los datos del body
  
    try {
      // Actualiza los datos del usuario con los valores recibidos en la solicitud
      const [update] = await User.update(
        { 
          firstName, 
          lastName, 
          photo, 
          email, 
          username, 
          password, 
          tenant_id: 1 // Suponiendo que siempre es el tenant_id 1
        },
        { where: { id } }
      );
  
      if (update) {
        const updatedUser = await User.findOne({ where: { id } });
        res.status(200).json({
          message: 'Usuario actualizado',
          user: updatedUser
        });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: "NO SE ACTUALIZÓ EL USUARIO",
        message: "Usuario NO ACTUALIZADO",
        error: error
      });
    }
  };
  


/*
const createUser = async (req, res) => {
    try {
        console.log(req.body)
		// desestructuracion
		const { nombre, apellido } = req.body
		console.log(nombre, apellido)
        
        const user = await User.create({
            firstName: nombre,
            lastName: apellido,
        });
        console.log(user)

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
}*/



module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser
}
