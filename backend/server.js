const express = require('express');
const cors = require('cors'); // Importar cors
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta para almacenar archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único del archivo
    },
});
const upload = multer({ storage });

// Ruta para manejar la carga y análisis del archivo
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            console.log('No se recibió ningún archivo.');
            return res.status(400).send({ message: 'No se ha subido ningún archivo.' });
        }

        console.log('Archivo recibido:', req.file.path);

        // Leer y extraer texto del PDF
        const pdfBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(pdfBuffer);

        console.log('Texto extraído del PDF:', data.text);

        res.status(200).send({
            message: 'Archivo procesado exitosamente',
            data: data.text,
        });
    } catch (error) {
        console.error('Error procesando el archivo:', error.message);
        res.status(500).send({ message: 'Error procesando el archivo.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
