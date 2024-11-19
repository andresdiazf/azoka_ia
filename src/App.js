// src/App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import './App.css'; // Asegúrate de tener un archivo CSS para estilos globales.

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [jobProfile, setJobProfile] = useState(''); // Estado para el perfil del cargo
  const [comparisonResult, setComparisonResult] = useState(''); // Resultado de la comparación
  const [isError, setIsError] = useState(false);

  // Función para manejar la selección del archivo
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResponseMessage('');
    setPdfText('');
    setComparisonResult('');
    setIsError(false);
    console.log('Archivo seleccionado:', selectedFile);
  };

  // Función para manejar el envío del archivo
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
      setResponseMessage(result.message);
      setPdfText(result.data); // Guardar texto extraído
      setIsError(false);
    } catch (error) {
      setResponseMessage(error.message);
      setPdfText('');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la comparación
  const handleCompare = async () => {
    if (!pdfText || !jobProfile.trim()) {
      alert('Por favor, sube un archivo y proporciona el perfil del cargo.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: pdfText, jobDescription: jobProfile }),
      });

      if (!response.ok) {
        throw new Error('Error al comparar los perfiles.');
      }

      const result = await response.json();
      setComparisonResult(result.comparison); // Guardar resultado
      setIsError(false);
    } catch (error) {
      setComparisonResult('Ocurrió un error durante la comparación.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar todos los datos
  const handleClearAll = () => {
    setFile(null);
    setResponseMessage('');
    setPdfText('');
    setJobProfile('');
    setComparisonResult('');
    setIsError(false);
  };

  return (
    <div className="App">
      {/* Título estilizado */}
      <header className="app-header">
        <h1 className="app-title">Azoka</h1>
        <p className="app-subtitle">Gestión inteligente de hojas de vida</p>
      </header>

      {/* Formulario para ingresar el perfil del cargo */}
      <div className="job-profile-form">
        <label htmlFor="jobProfile">
          <strong>Perfil del Cargo:</strong>
        </label>
        <textarea
          id="jobProfile"
          rows="5"
          className="border rounded-md p-2 w-full mt-2"
          value={jobProfile}
          onChange={(e) => setJobProfile(e.target.value)}
          placeholder="Describe el perfil del cargo aquí..."
        ></textarea>
      </div>

      {/* Componente para subir archivos */}
      <FileUpload onFileSelect={handleFileSelect} />

      {file && (
        <div className="file-actions">
          <p className="file-info">Archivo seleccionado: {file.name}</p>
          <button
            onClick={handleFileSubmit}
            className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Subir Archivo'}
          </button>
          <button onClick={handleClearAll} className="btn btn-secondary">
            Limpiar Todo
          </button>
        </div>
      )}

      {responseMessage && (
        <p className={`response-message ${isError ? 'error' : 'success'}`}>
          {responseMessage}
        </p>
      )}

      {/* Botón para comparar perfiles */}
      {pdfText && (
        <button
          onClick={handleCompare}
          className="btn btn-success mt-4"
          disabled={loading}
        >
          {loading ? 'Comparando...' : 'Comparar Perfiles'}
        </button>
      )}

      {/* Mostrar resultado de la comparación */}
      {comparisonResult && (
        <div className="comparison-result">
          <h3 className="result-title">Resultado de la Comparación:</h3>
          <pre className="result-text">{comparisonResult}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
