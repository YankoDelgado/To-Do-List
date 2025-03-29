import mysql from "mysql2/promise"
import "dotenv/config"

async function initializeDatabase() {
  // Primero conectamos sin especificar una base de datos
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try {
        // Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Base de datos ${process.env.DB_NAME} creada o ya existente`);
        
        // Usar la base de datos
        await connection.query(`USE ${process.env.DB_NAME}`);
        
        // Crear tabla de usuarios
        await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
        console.log('Tabla users creada o ya existente');
        
        // Crear tabla de tareas
        await connection.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            text VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `);
        console.log('Tabla tasks creada o ya existente');
        
        console.log('Inicialización de la base de datos completada');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    } finally {
        await connection.end();
    }
}

initializeDatabase();