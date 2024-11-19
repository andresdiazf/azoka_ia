// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado
    const [extractedText, setExtractedText] = useState(''); // Texto extraído del PDF

    // Manejar la selección de archivos
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // Subir el archivo al servidor
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Por favor selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir el archivo.');
            }

            const text = await response.text(); // Supongamos que el servidor devuelve el texto
            setExtractedText(text);
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al subir el archivo.');
        }
    };

    // Limpiar el formulario
    const handleClear = () => {
        setSelectedFile(null);
        setExtractedText('');
    };

    return (
        <div className="file-upload">
            <h1>Sube tu hoja de vida (PDF)</h1>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                <br />
                <br />
                <button type="submit">Subir Archivo</button>
                <button type="button" onClick={handleClear}>
                    Limpiar
                </button>
            </form>
            <div id="result" style={{ marginTop: '20px' }}>
                {extractedText && (
                    <div>
                        <strong>Texto extraído:</strong>
                        <p>{extractedText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
