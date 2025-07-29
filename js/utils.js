function saveData(data) {
  localStorage.setItem('playerData', JSON.stringify(data));
}

function loadData() {
  const data = localStorage.getItem('playerData');
  return data ? JSON.parse(data) : null;
}

function resetData() {
  localStorage.removeItem('playerData');
}

export { saveData, loadData, resetData };
