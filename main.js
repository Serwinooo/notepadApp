const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Correctly define the preload.js path
    }
  });

  mainWindow.loadFile('index.html'); // Adjust if your file is named differently
}

app.whenReady().then(createWindow);
