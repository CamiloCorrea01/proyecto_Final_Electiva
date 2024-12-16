const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { swaggerUi, specs } = require('./swaggerConfig');

// Rutas
const fondoRoutes = require('./routes/fondoRoutes');
const asignacionesRoutes = require('./routes/asignacionesRoutes');
const alertaRoutes = require('./routes/alertaRoutes');
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuarios

// Función para generar alertas
const { generarAlertas } = require('./services/alertaService'); // Ajusta la ruta

// Middleware
const authenticateToken = require('./middleware/authenticateToken');

dotenv.config();

const app = express();

// Middleware global
app.use(express.json());
app.use(cors());
app.options('*', cors()); // Permitir preflight OPTIONS


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
    generarAlertas();  // Ejecuta la función para generar alertas
}).catch(err => {
    console.error('Error de conexión:', err);
});

// Rutas principales
app.use('/api/fondos', fondoRoutes);
app.use('/api/fondos/:fondoId/asignaciones', asignacionesRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/usuarios', userRoutes); // Agregar rutas de usuarios


// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
