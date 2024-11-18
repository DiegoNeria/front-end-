const bcrypt = require('bcrypt');

module.exports = (Sequelize, type) => {
  const User = Sequelize.define('users', {
    id: {
      type: type.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    // Nombre del usuario
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    // Apellido del usuario
    lastName: {
      type: type.STRING,
      allowNull: false
    },
    // Foto de perfil (URL)
    photo: {
      type: type.STRING,
      allowNull: true // Opcional
    },
    // Correo electrónico
    email: {
      type: type.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // Nombre de usuario
    username: {
      type: type.STRING(30),
      allowNull: false,
      unique: true
    },
    // Contraseña
    password: {
      type: type.STRING,
      allowNull: false
    },
    // Clave foránea (tenant_id)
    tenant_id: {
      type: type.BIGINT,
      allowNull: false,
      references: {
        model: 'tenants', // Nombre de la tabla relacionada
        key: 'id'
      }
    }
  }, {
    timestamps: true, // Para mantener createdAt y updatedAt
  });

  // Hash de la contraseña antes de crear el usuario
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
