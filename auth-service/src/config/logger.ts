// logger.ts
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston'; // Usar winston para más flexibilidad

// Crea la carpeta de logs si no existe
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Crea un flujo de escritura en un archivo
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Configura morgan para usar el formato 'combined' y escribir en el archivo
const morganMiddleware = morgan('combined', { stream: accessLogStream });

// Crea un logger usando winston
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(), // Log en consola
    new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }), // Log de errores en un archivo
    new transports.File({ filename: path.join(logDirectory, 'combined.log') }) // Log combinado
  ],
});

// Exporta tanto el middleware de Morgan como el logger
export { morganMiddleware, logger };
