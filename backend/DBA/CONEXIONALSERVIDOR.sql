-- Crear tabla Empresa
CREATE TABLE Empresa (
    id_empresa INT IDENTITY(1,1) PRIMARY KEY, 
    Nombre NVARCHAR(100) NOT NULL,
    Industria NVARCHAR(100) NOT NULL,
    Tamaño NVARCHAR(50) NOT NULL,
    Localización NVARCHAR(150) NOT NULL,
    Sector NVARCHAR(100) NOT NULL
);

-- Crear tabla Vacante
CREATE TABLE Vacante (
    id_vacante INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(100) NOT NULL,
    Departamento NVARCHAR(100) NOT NULL,
    Requisitos NVARCHAR(MAX) NOT NULL,
    Salario DECIMAL(18, 2), -- Permite NULL
    Jornada NVARCHAR(50) NOT NULL,
    Localización NVARCHAR(150) NOT NULL,
    Fecha_publicacion DATE NOT NULL,
    Fecha_fin DATE NOT NULL,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa)
);

-- Crear tabla Candidato
CREATE TABLE Candidato (
    id_candidato INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    id_curriculum INT NOT NULL,
    id_proceso_seleccion INT NOT NULL
);

-- Crear tabla Proceso_seleccion
CREATE TABLE Proceso_seleccion (
    id_proceso_seleccion INT IDENTITY(1,1) PRIMARY KEY,
    Test NVARCHAR(MAX) NOT NULL,
    Pruebas_psicotecnicas NVARCHAR(MAX) NOT NULL,
    Fecha_inicio DATE NOT NULL,
    Fecha_cierre DATE NOT NULL
);

-- Crear tabla Candidato_Vacante
CREATE TABLE Candidato_Vacante (
    id_candidato INT NOT NULL,
    id_vacante INT NOT NULL,
    PRIMARY KEY (id_candidato, id_vacante),
    FOREIGN KEY (id_candidato) REFERENCES Candidato(id_candidato),
    FOREIGN KEY (id_vacante) REFERENCES Vacante(id_vacante)
);

-- Crear tabla Curriculum
CREATE TABLE Curriculum (
    id_curriculum INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Contenido NVARCHAR(MAX) NOT NULL,
    Formato NVARCHAR(10) NOT NULL
);

-- Crear tabla Candidato_Curriculum
CREATE TABLE Candidato_Curriculum (
    id_candidato INT NOT NULL,
    id_curriculum INT NOT NULL,
    PRIMARY KEY (id_candidato, id_curriculum),
    FOREIGN KEY (id_candidato) REFERENCES Candidato(id_candidato),
    FOREIGN KEY (id_curriculum) REFERENCES Curriculum(id_curriculum)
);

-- Crear tabla Preseleccion
CREATE TABLE Preseleccion (
    id_algoritmo INT IDENTITY(1,1) PRIMARY KEY,
    Criterios NVARCHAR(MAX) NOT NULL,
    Resultados NVARCHAR(MAX) NOT NULL,
    Score DECIMAL(5, 2) NOT NULL,
    id_candidato INT NOT NULL,
    FOREIGN KEY (id_candidato) REFERENCES Candidato(id_candidato)
);

-- Crear tabla Candidato_Final
CREATE TABLE Candidato_Final (
    id_final INT IDENTITY(1,1) PRIMARY KEY,
    id_candidato INT NOT NULL,
    id_curriculum INT NOT NULL,
    Score DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (id_candidato) REFERENCES Candidato(id_candidato),
    FOREIGN KEY (id_curriculum) REFERENCES Curriculum(id_curriculum)
);