// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 337,
    height: 506,
    icon: path.join(__dirname, 'assets', 'icon.png') ,
    autoHideMenuBar: true,
    backgroundColor: '#FFF',
    useContentSize: true,
    resizable: true,
    minWidth:337,
    minHeight:506,
    maxWidth:337,
    fullscreen:false,
    backgroundColor:"#313338"
    })
  const loginWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: path.join(__dirname, 'assets', 'icon.png') ,
    autoHideMenuBar: true,
    backgroundColor: '#FFF',
    useContentSize: true,
    resizable: true,
    center: true,
    fullscreen:false,
    backgroundColor:"#313338"
    })
loginWindow.webContents.on('did-finish-load', () => {
  loginWindow.webContents.insertCSS(`
    .custom-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: 2c3e50;
      color: white;
      padding: 10px;
      z-index: 9999;
    }
  `)
  
  loginWindow.webContents.executeJavaScript(`
    const header = document.createElement('div')
    header.className = 'custom-header'
    header.textContent = 'Login in in this window using qr-code, then restart the app and close this window.'
    document.body.prepend(header)
    
    // Ajustar el contenido para no quedar detrás del header
    const content = document.querySelector('body > *:not(.custom-header)')
    if (content) {
      content.style.marginTop = '60px'
    }
  `)
})
  // and load the index.html of the app.
    mainWindow.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1')

 mainWindow.loadURL('https://discord.com/app')
 loginWindow.loadURL('https://discord.com/login')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
