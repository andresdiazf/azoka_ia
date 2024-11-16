// src/components/FileUpload.js
import React from 'react';

const FileUpload = ({ onFileSelect }) => {
    // Función para manejar el cambio de archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Obtener el primer archivo
        if (file) {
            onFileSelect(file); // Llama al callback con el archivo seleccionado
        }
    };

    return (
        <div className="file-upload">
            <input
                type="file"
                accept="application/pdf" // Solo permite archivos PDF
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUpload;
