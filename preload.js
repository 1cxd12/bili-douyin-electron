const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  fetchBilibili: () => ipcRenderer.invoke('fetch-bilibili'),
  fetchDouyin: (kw) => ipcRenderer.invoke('fetch-douyin', kw)
}); 