const biliBtn = document.getElementById('biliBtn');
const biliResult = document.getElementById('biliResult');
const douyinBtn = document.getElementById('douyinBtn');
const douyinKw = document.getElementById('douyinKw');
const douyinResult = document.getElementById('douyinResult');

biliBtn.onclick = async () => {
  const data = await window.electronAPI.fetchBilibili();
  biliResult.textContent = JSON.stringify(data, null, 2);
};

douyinBtn.onclick = async () => {
  const kw = douyinKw.value.trim();
  if (!kw) return;
  const data = await window.electronAPI.fetchDouyin(kw);
  douyinResult.textContent = data;
}; 