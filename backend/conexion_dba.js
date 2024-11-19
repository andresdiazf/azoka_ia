const sql = require('mssql');

const config = {
  user: 'Blue\\andre', // tu usuario SQL
  password: 'SoyDev2023', // tu contraseña SQL
  server: 'localhost\\SQLEXPRESS', // nombre del servidor con la instancia de SQL Express
  database: 'master', // nombre de la base de datos que ahora usarás
  options: {
    encrypt: false, // usa true si estás usando Azure SQL
    trustServerCertificate: true, // para evitar problemas con certificados no confiables
    enableArithAbort: true // necesario para algunas versiones de SQL Server
  }
};

const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Conectado a SQL Server');
    return pool; // Devolver la conexión para usarla en otros archivos
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  }
};

module.exports = { connectToDatabase, sql };
