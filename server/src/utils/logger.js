import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getLogFileName = () => {
  const date = new Date().toISOString().split('T')[0];
  return path.join(logsDir, `error-${date}.log`);
};

export const logError = (error, req = null) => {
  const timestamp = new Date().toISOString();
  const logFileName = getLogFileName();

  let logMessage = `[${timestamp}] ERROR:\n`;
  logMessage += `Message: ${error.message}\n`;
  logMessage += `Stack: ${error.stack}\n`;

  if (req) {
    logMessage += `Request: ${req.method} ${req.originalUrl}\n`;
    logMessage += `IP: ${req.ip}\n`;
    logMessage += `User Agent: ${req.get('user-agent')}\n`;
    if (req.user) {
      logMessage += `User ID: ${req.user._id}\n`;
    }
  }

  logMessage += '---\n\n';

  fs.appendFile(logFileName, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

export const logInfo = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] INFO: ${message}`);
};

export const logWarning = (message) => {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] WARNING: ${message}`);
};
