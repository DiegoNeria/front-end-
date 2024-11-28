const express = require('express');
const multer = require('multer');
const cors = require('cors');  // Importar CORS
require('dotenv').config();

const app = express();

// Configuración de CORS
var corsOptions = {
  origin: 'http://localhost:3000',  // Asegúrate de permitir tu frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));  // Usar CORS con las opciones configuradas

// Middleware para parsear JSON
app.use(express.json());

// Configuración de multer para manejar las fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define la carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Genera un nombre único para cada archivo
  },
});

const upload = multer({ storage: storage });

// Rutas de la aplicación
const ContactsRoutes = require('./src/routes/contacts.routes');
const UsersRoutes = require('./src/routes/users.routes');
const LoginRoutes = require('./src/routes/login.routes');
const TenantRoutes = require('./src/routes/tenants.routes');

// Ruta de creación de usuario con foto
app.post('/users/crear-usuario', upload.single('photo'), (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const photo = req.file;  // El archivo cargado

  // Verifica que recibas los datos correctamente
  console.log(firstName, lastName, email, username, password, photo);

  // Aquí puedes agregar la lógica para guardar los datos en la base de datos
  res.status(200).json({ message: 'Usuario creado exitosamente' });
});

// Rutas de la aplicación
app.use('/contactos', ContactsRoutes);
app.use('/users', UsersRoutes);
app.use('/login', LoginRoutes);
app.use('/tenants', TenantRoutes);

// Escuchar en el puerto configurado
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
