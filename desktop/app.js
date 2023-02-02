const {app, BrowserWindow, ipcMain, screen} = require('electron');
const url = require("url");
const path = require('path');


let win;
let gameWindow;
let screenWidth;
let screenHeight;
let mainWidth = 750;
let mainHeight = 700;
let gameWidth = 116;
let gameHeight = 230; //attention décimales et impaire crée erreur

function createMainWindow () {
  
  win = new BrowserWindow({
  // frame: false,
  transparent:true,
  titleBarStyle: 'hidden',
  width: mainWidth,
  height: mainHeight,
  // minWidth: mainWidth,
  // minHeight: mainHeight,
  // x: screenWidth - appWidth,
  // y: (screenHeight - appHeight)/2,
  center: true,
  
  webPreferences: {
    nodeIntegration: true,
    devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, "/dist/test-desktop-electron-app/index.html"));
  
  win.webContents.openDevTools(true);
  // win.setAlwaysOnTop(true, "screen-saver");
  // win.setVisibleOnAllWorkspaces(true);
  win.show();
}

function setMainWindow () {
  screenWidth = screen.getPrimaryDisplay().size.width;
  screenHeight = screen.getPrimaryDisplay().size.height;

  win.setContentSize(gameWidth, gameHeight);
  win.setPosition(screenWidth - gameWidth, (screenHeight - gameHeight)/2);
  
  
  //gameWindow.webContents.openDevTools();
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true);
}

function setGameWindow () {
  win.setContentSize(mainWidth, mainHeight);
  win.setPosition(350, 20);
  
  //gameWindow.webContents.openDevTools();
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true);
}


app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitlee);
  ipcMain.on('set-x', handleSetXPosition);
  ipcMain.on('set-main-windows', setMainWindow);
  ipcMain.on('set-game-windows', setGameWindow);
  
  createMainWindow();
  win.focus();
  //win.setIgnoreMouseEvents(true);
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
  //setTimeout(() => win.close(), 5000);
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function handleSetTitlee (event, titlee) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(titlee);
}

function handleSetXPosition (event, x) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setPosition(x, 300);
}

//win.methode appartient à electron, c'est pas une méthode que j'ai créé
// function handleCloseWindows (event) {
//   const webContents = event.sender;
//   const win = BrowserWindow.fromWebContents(webContents);
//   setMainWindow();
// }

// function handleReopenWindow (event) {
//   const webContents = event.sender;
//   const win = BrowserWindow.fromWebContents(webContents);
//   setGameWindow();
// }


