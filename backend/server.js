const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware global
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de Multer para carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta de destino
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    },
});
const upload = multer({ storage });

// Ruta para subir y procesar archivos PDF
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
        }

        // Leer y analizar el contenido del archivo PDF
        const pdfBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(pdfBuffer);

        res.status(200).json({
            message: 'Archivo procesado exitosamente',
            data: data.text,
        });
    } catch (error) {
        console.error('Error procesando el archivo:', error.message);
        res.status(500).json({ message: 'Error procesando el archivo.' });
    }
});

// Importar rutas para funcionalidades adicionales
const routes = require('./routes/index'); // Ajusta la ruta si el archivo está en otra carpeta
app.use('/api', routes); // Prefijo '/api' para las rutas del index.js

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
