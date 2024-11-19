const express = require('express');
const openai = require('openai'); // Cambiamos cómo se importa
require('dotenv').config();

const router = express.Router();

// Configuración de OpenAI
openai.apiKey = process.env.OPENAI_API_KEY; // Configuración directa de la clave

// Ruta para comparación de perfiles
router.post('/compare', async (req, res) => {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
        return res.status(400).json({ error: 'Ambos campos, resumeText y jobDescription, son requeridos.' });
    }

    try {
        const response = await openai.Chat.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Eres un experto en análisis de perfiles laborales.' },
                {
                    role: 'user',
                    content: `Compara el siguiente texto de una hoja de vida con el perfil de un cargo. Evalúa coincidencias, fortalezas y debilidades:
                    
                    Texto de la hoja de vida:
                    ${resumeText}
                    
                    Perfil del cargo:
                    ${jobDescription}
                    
                    Genera un informe detallado de afinidad.`,
                },
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        res.json({ report: response.choices[0].message.content });
    } catch (error) {
        console.error('Error al consultar OpenAI:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
});

module.exports = router;
