const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'public/icon.png'),
    show: false
  })

  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`
  
  mainWindow.loadURL(startUrl)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC handlers for database operations
ipcMain.handle('database-query', async (event, query, params) => {
  // Database query handler will be implemented
  return { success: true, data: [] }
})

ipcMain.handle('print-receipt', async (event, receiptData) => {
  // Print handler
  return { success: true }
})

ipcMain.handle('export-data', async (event, data, format) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: `restaurant-data-${new Date().toISOString().split('T')[0]}.${format}`,
    filters: [
      { name: 'CSV Files', extensions: ['csv'] },
      { name: 'PDF Files', extensions: ['pdf'] },
      { name: 'JSON Files', extensions: ['json'] }
    ]
  })
  
  if (!result.canceled) {
    // Export logic here
    return { success: true, path: result.filePath }
  }
  
  return { success: false }
})