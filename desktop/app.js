const {app, BrowserWindow, ipcMain, screen, document} = require('electron');
const url = require("url");
const path = require('path');

let mainWindow;
let screenWidth;
let screenHeight;
let appWidth = 160;
let appHeight = 200;

function handleSetTitlee (eventt, titlee) {
  const webContents = eventt.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(titlee);
}

function handleSetXPosition (eventt, x) {
  const webContents = eventt.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setPosition(x, 300);

}

function createWindow () {
  screenWidth = screen.getPrimaryDisplay().size.width;
  screenHeight = screen.getPrimaryDisplay().size.height;
  mainWindow = new BrowserWindow({
  frame: false,
  transparent:true,
  //titleBarStyle: 'hidden',
  width: appWidth,
  height: appHeight,
  x: screenWidth - appWidth,
  y: (screenHeight - appHeight)/2,
  
  
  webPreferences: {
    nodeIntegration: true,
    devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  //verifier à quoi sert ce code car je peux modifier le titre depuis un component sans lui
  // ipcMain.on('set-title', (event, title) => {
  //   const webContents = event.sender
  //   const win = BrowserWindow.fromWebContents(webContents)
  //   win.setTitle(title)
  // })
  //
  mainWindow.loadFile(path.join(__dirname, "/dist/test-desktop-electron-app/index.html"));
  
  mainWindow.webContents.openDevTools();
  mainWindow.setAlwaysOnTop(true, "screen-saver");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.show();
}


app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitlee);
  ipcMain.on('set-x', handleSetXPosition);
  createWindow();
  mainWindow.focus(),
  //mainWindow.setIgnoreMouseEvents(true);
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})