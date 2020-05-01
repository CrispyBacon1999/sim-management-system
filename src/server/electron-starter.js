// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const { setupListeners, sendConfig } = require("./watchers/watchers");
const { setupControlPanelListeners } = require("./watchers/controlPanel");

app.disableHardwareAcceleration();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 506,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const controlWindow = new BrowserWindow({
    width: 900,
    height: 300,
    minWidth: 500,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // mainWindow.setMenu(null);
  // controlWindow.setMenu(null);

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  const controlUrl =
    process.env.ELECTRON_START_URL + "#/control" ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      hash: "/control",
      protocol: "file:",
      slashes: true,
    });
  mainWindow.loadURL(startUrl);
  controlWindow.loadURL(controlUrl);
  mainWindow.webContents.openDevTools();
  startWatchers(mainWindow, controlWindow);
}

function startWatchers(window, controlPanel) {
  configRequest();
  setupListeners(window, controlPanel);
  setupControlPanelListeners(window, controlPanel);
}

function configRequest() {
  ipcMain.on("requestConfig", (event) => {
    sendConfig(event);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
