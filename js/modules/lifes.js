import { playerData } from '../game-settings.js';
import { saveData } from '../utils.js';

// Вычисление времени отсутствия и подстановка нужных значений
const now = Date.now();
if (playerData.lifes.lastLifeLostAt && playerData.lifes.lifesCount < playerData.gameRuleset.maxLifes) {
  const interval = Math.floor((now - playerData.lifes.lastLifeLostAt) / 1000);
  playerData.lifes.seconds -= interval;
} else {
  playerData.lifes.lifesCount = playerData.gameRuleset.maxLifes;
  playerData.lifes.minutes = 0;
  playerData.lifes.seconds = 0;
}
while (playerData.lifes.seconds < 0) {
  playerData.lifes.seconds += 59;
  playerData.lifes.minutes--;
  if (playerData.lifes.minutes === -1) {
    playerData.lifes.lifesCount++;
    if (playerData.lifes.lifesCount < playerData.gameRuleset.maxLifes) {
      playerData.lifes.minutes = 29;
    } else {
      playerData.lifes.minutes = 0;
      playerData.lifes.seconds = 0;
      break;
    }
  }
}

// Находим все необходимые элементы
const headerLifes = document.querySelector('.page-header__lifes');
const headerLifesCounter = headerLifes.querySelector('.page-header__lifes-counter');
const headerLifesTimer = headerLifes.querySelector('.page-header__lifes-timer');
let headerLifesTimerMinutes = headerLifesTimer.querySelector('.page-header__lifes-timer-minutes');
let headerLifesTimerSeconds = headerLifesTimer.querySelector('.page-header__lifes-timer-seconds');
const lifeModal = document.querySelector('.life-modal');
const closeLifeModalButton = lifeModal.querySelector('.life-modal__close-button');
const lifeModalLifesCounter = lifeModal.querySelector('.life-modal__lifes-counter');
const lifeModalText = lifeModal.querySelector('.life-modal__text');
let lifeModalMinutes = lifeModalText.querySelector('.life-modal__minutes');
let lifeModalSeconds = lifeModalText.querySelector('.life-modal__seconds');
const addLifesButton = lifeModal.querySelector('.life-modal__add-lifes-button');
const addLifesPriceText = addLifesButton.querySelector('.life-modal__add-lifes-price');

const coinsCounter = document.querySelector('.page-header__coins-counter');

// Показываем актуальные данные
coinsCounter.textContent = playerData.coins;
headerLifesCounter.textContent = playerData.lifes.lifesCount;
lifeModalLifesCounter.textContent = playerData.lifes.lifesCount;

if (playerData.lifes.lifesCount >= playerData.gameRuleset.maxLifes) {
  headerLifesTimer.textContent = 'Все';
  lifeModalText.textContent = 'Все жизни восстановлены! Самое время сыграть!';
  addLifesButton.disabled = true;
} else {
  headerLifesTimer.innerHTML = '<span class="page-header__lifes-timer-minutes"></span>:<span class="page-header__lifes-timer-seconds"></span>';
  headerLifesTimerMinutes = headerLifesTimer.querySelector('.page-header__lifes-timer-minutes');
  headerLifesTimerSeconds = headerLifesTimer.querySelector('.page-header__lifes-timer-seconds');
  lifeModalText.innerHTML = 'До восстановления следующей жизни осталось: <br> <span class="life-modal__minutes"></span>:<span class="life-modal__seconds"></span>';
  lifeModalMinutes = lifeModalText.querySelector('.life-modal__minutes');
  lifeModalSeconds = lifeModalText.querySelector('.life-modal__seconds');
  addLifesButton.disabled = false;
}

// Каждую секунду обновление данных
function updateLifes() {
  headerLifesTimerSeconds.textContent--;
  lifeModalSeconds.textContent--;
  playerData.lifes.minutes = headerLifesTimerMinutes.textContent;
  playerData.lifes.seconds = headerLifesTimerSeconds.textContent;
  playerData.lifes.lastLifeLostAt = Date.now();
  saveData(playerData);

  if (headerLifesTimerSeconds.textContent == -1) {
    headerLifesTimerSeconds.textContent = 59;
    headerLifesTimerMinutes.textContent--;
    lifeModalSeconds.textContent = 59;
    lifeModalMinutes.textContent--;
  }

  if (headerLifesTimerMinutes.textContent == 0 && headerLifesTimerSeconds.textContent == 0) {
    playerData.lifes.lifesCount++;
    headerLifesCounter.textContent++;
    lifeModalLifesCounter.textContent++;
    saveData(playerData);

    if (playerData.lifes.lifesCount < playerData.gameRuleset.maxLifes) {
      headerLifesTimerMinutes.textContent = 29;
      headerLifesTimerSeconds.textContent = 59;
      lifeModalMinutes.textContent = 29;
      lifeModalSeconds.textContent = 59;
    } else {
      headerLifesTimer.textContent = 'Все';
      lifeModalText.textContent = 'Все жизни восстановлены! Самое время сыграть!';
      clearInterval(updateLifes, 1000);
      playerData.lifes.minutes = 0;
      playerData.lifes.seconds = 0;
      saveData(playerData);
    }
  }
}

// Начальные настроцки для интервала
if (playerData.lifes.lifesCount < playerData.gameRuleset.maxLifes) {
  if (!playerData.lifes.minutes && !playerData.lifes.seconds) {
    headerLifesTimerMinutes.textContent = 29;
    headerLifesTimerSeconds.textContent = 59;
    lifeModalMinutes.textContent = 29;
    lifeModalSeconds.textContent = 59;
  } else {
    headerLifesTimerMinutes.textContent = playerData.lifes.minutes;
    headerLifesTimerSeconds.textContent = playerData.lifes.seconds;
    lifeModalMinutes.textContent = playerData.lifes.minutes;
    lifeModalSeconds.textContent = playerData.lifes.seconds;
  }
  setInterval(updateLifes, 1000);
}

function hideLifeModal() {
  lifeModal.classList.add('hidden');
  closeLifeModalButton.removeEventListener('click', hideLifeModal);
}

function showLifeModal() {
  lifeModal.classList.remove('hidden');
  closeLifeModalButton.addEventListener('click', hideLifeModal);
  addLifesPriceText.textContent = playerData.gameRuleset.prices.lifes;

  // Пополнение жизней
  addLifesButton.addEventListener('click', () => {
    if (playerData.coins >= playerData.gameRuleset.prices.lifes) {
      playerData.coins -= playerData.gameRuleset.prices.lifes;
      coinsCounter.textContent = playerData.coins;
      playerData.lifes.lifesCount = playerData.gameRuleset.maxLifes;
      headerLifesCounter.textContent = playerData.lifes.lifesCount;
      lifeModalLifesCounter.textContent = playerData.lifes.lifesCount;
      headerLifesTimer.textContent = 'Все';
      lifeModalText.textContent = 'Все жизни восстановлены! Самое время сыграть!';
      addLifesButton.disabled = true;
      clearInterval(updateLifes, 1000);
      saveData(playerData);
      hideLifeModal();
    }
  });
}

headerLifes.addEventListener('click', showLifeModal);

export { showLifeModal };
