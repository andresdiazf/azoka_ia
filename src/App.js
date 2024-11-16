// src/App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Función que se ejecuta cuando se selecciona un archivo
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResponseMessage('');
    setIsError(false);
    console.log('Archivo seleccionado:', selectedFile);
  };

  // Función para manejar el envío del archivo al servidor
  const handleFileSubmit = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo primero.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al cargar el archivo.');
      }

      const result = await response.json();
      setResponseMessage(result.message); // Guardar mensaje de éxito
      setIsError(false);
    } catch (error) {
      setResponseMessage(error.message); // Mostrar mensaje de error
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar el archivo seleccionado
  const handleClearFile = () => {
    setFile(null);
    setResponseMessage('');
    setIsError(false);
  };

  return (
    <div className="App">
      <h1>Sube tu hoja de vida (PDF)</h1>
      {/* Usando el componente FileUpload */}
      <FileUpload onFileSelect={handleFileSelect} />

      {file && (
        <div>
          <p>Archivo seleccionado: {file.name}</p>
          <button
            onClick={handleFileSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Subir Archivo'}
          </button>
          <button
            onClick={handleClearFile}
            className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Limpiar
          </button>
        </div>
      )}

      {responseMessage && (
        <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default App;
