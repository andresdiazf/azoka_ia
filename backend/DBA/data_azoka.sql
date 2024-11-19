CREATE TABLE HojaDeVida (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(255),
    correo NVARCHAR(255),
    experiencia NVARCHAR(MAX),
    habilidades NVARCHAR(MAX),
    texto_completo NTEXT
);
