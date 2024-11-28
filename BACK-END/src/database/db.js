const { Sequelize, DataTypes } = require('sequelize');

// Importar modelos desde la carpeta models
const UserModel = require('./models/users');
const TenantModel = require('./models/tenants');

// Configuración de SSL (ajustada directamente)
const sslopt = {
  ssl: false, // Desactiva SSL de forma global
};

// Inicializar Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
    native: false,
    dialectOptions: sslopt, // Usar la configuración definida
  }
);

// Autenticar conexión con la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Database Connected'))
  .catch((error) => console.error('Connection error:', error));

// Inicializar modelos
const User = UserModel(sequelize, DataTypes);
const Tenant = TenantModel(sequelize, DataTypes);

// Sincronizar la base de datos y tablas
sequelize
  .sync({ alter: true })
  .then(() => console.log('Database & tables synchronized!'))
  .catch((e) => console.error('Error syncing database:', e));

module.exports = {
  User,
  Tenant,
};
