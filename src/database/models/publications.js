module.exports = (Sequelize, type) => {
    return Sequelize.define('publications', {
      // Columna Id: clave primaria serial
      id: {
        type: type.BIGINT,
        autoIncrement: true,  // serial (autoincremental)
        primaryKey: true
      },
      // Columna identificacion: VARCHAR(100), nombre/string de una plataforma
      identificacion: {
        type: type.STRING(100),  // VARCHAR(100)
        allowNull: false         // No puede ser nulo
      },
      // Columna plataform_id: Clave foránea a la tabla 'platforms'
      plataform_id: {
        type: type.BIGINT,      // Tipo de dato para la relación (clave foránea)
        allowNull: false,       // No puede ser nulo
        references: {
          model: 'platforms',   // Nombre de la tabla a la que hace referencia
          key: 'id'             // Columna que se referencia en la tabla platforms
        }
      },
      // Columna user_id: Clave foránea a la tabla 'users'
      user_id: {
        type: type.BIGINT,      // Tipo de dato para la relación (clave foránea)
        allowNull: false,       // No puede ser nulo
        references: {
          model: 'users',       // Nombre de la tabla a la que hace referencia
          key: 'id'             // Columna que se referencia en la tabla users
        }
      }
    },
    {
      timestamps: true,  // Añade columnas createdAt y updatedAt
    });
  };
  