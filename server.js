// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(bodyParser.json());

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/BolaDeDracDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validar que se reciban los datos
    if (!username || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    // Crear un nuevo usuario
    const user = new User({ username, password });

    try {
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de la Biblioteca de Bola de Drac en funcionamiento');
});

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
