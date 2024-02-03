const fs = require('fs');
const os = require('os');
const path = require('path');

const webApiUrlEnv = "WEB_API_URL";
const envPath = path.join(__dirname, '../.env'); // Adjust the path as necessary

const interfaces = os.networkInterfaces();
// Find the internal IPv4 Address of your host machine
const ipAddress = interfaces[devName].find(alias => alias.family === 'IPv4' && !alias.internal).address;
const url = `http://${ipAddress}:4000/api/`;

// We read in all pre-existing env variables, then update the 
// env variable for web api url, then rewrite entire dictionary back
// to .env file. This prevents loss of other env variables in file
function readEnvFile(filePath) {
  const env = {};
  try {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        env[key.trim()] = value.trim();
      }
    });
  } catch (error) {
    console.error(`Could not read the .env file: ${error}`);
  }
  return env;
}

// Function to write the dictionary back to the .env file
function writeEnvFile(env, filePath) {
  const lines = Object.keys(env).map(key => `${key}=${env[key]}`);
  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`.env file has been updated.`);
}

// Read, update, and write the .env file
const env = readEnvFile(envPath);
env[webApiUrlEnv] = url; // Update the WEB_API_URL
writeEnvFile(env, envPath);
