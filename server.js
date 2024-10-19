const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Episode = require('./models/Episode');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/BolaDeDracDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
});

// Ruta para servir archivos estáticos (incluidos los videos)
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use(express.static(path.join(__dirname, 'src')));

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para agregar una película
app.post('/movies', async (req, res) => {
    try {
        const { title, year, filePath } = req.body;
        const newMovie = new Movie({ title, year, filePath });
        await newMovie.save();
        res.status(201).json({ message: 'Película creada exitosamente', movie: newMovie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para agregar un episodio
app.post('/episodes', async (req, res) => {
    try {
        const { title, season, episodeNumber, filePath } = req.body;
        const newEpisode = new Episode({ title, season, episodeNumber, filePath });
        await newEpisode.save();
        res.status(201).json({ message: 'Episodio creado exitosamente', episode: newEpisode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener todos los episodios
app.get('/episodes', async (req, res) => {
    try {
        const episodes = await Episode.find();
        res.json(episodes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
