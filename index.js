const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 示例：B站账号信息采集
ipcMain.handle('fetch-bilibili', async () => {
  const res = await axios.get('https://api.bilibili.com/x/web-interface/nav');
  return res.data;
});

// 示例：抖音网页采集（仅公开内容，需处理反爬）
ipcMain.handle('fetch-douyin', async (event, keyword) => {
  const url = `https://www.douyin.com/search/${encodeURIComponent(keyword)}`;
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });
  // 用 cheerio 解析页面
  const $ = cheerio.load(res.data);
  // 这里只做简单示例，实际抖音页面需逆向分析
  return $('title').text();
}); 