import { playerData } from "../game-settings.js";
import { saveData, resetData } from "../utils.js";

// Находим все необходимые элементы
const headerProfile = document.querySelector('.page-header__profile');
const profileAvatar = headerProfile.querySelector('.page-header__profile-avatar');
const profileName = headerProfile.querySelector('.page-header__profile-name');
const profileModal = document.querySelector('.profile-modal');
const profileModalSections = profileModal.querySelectorAll('.profile-modal__section');
const closeButton = profileModal.querySelector('.profile-modal__close-button');
const tabLinks = profileModal.querySelectorAll('.profile-modal__tab-link');
const gameAvatars = profileModal.querySelectorAll('.profile-settings__avatar');
const resultAvatar = profileModal.querySelector('.profile-settings__result-avatar');
const playerNameInput = profileModal.querySelector('.profile-settings__player-name');
const uploadAvatarInput = profileModal.querySelector('#upload-avatar');
const saveButton = profileModal.querySelector('.profile-settings__save-button');
const cancelButton = profileModal.querySelector('.profile-settings__reset-button');
const resetButton = profileModal.querySelector('.progress__reset-button');

profileAvatar.src = playerData.profile.avatar;
profileName.textContent = playerData.profile.name;

function hideProfileModal() {
  profileModal.classList.add('hidden');
  closeButton.removeEventListener('click', hideProfileModal);
}

function showProfileModal() {
  // Показываем актуальные данные
  profileModal.classList.remove('hidden');
  closeButton.addEventListener('click', hideProfileModal);
  resultAvatar.src = playerData.profile.avatar;
  playerNameInput.value = playerData.profile.name;

  // Функционал табов
  for (let tabLink of tabLinks) {
    tabLink.addEventListener('click', () => {
      tabLinks.forEach((link) => {
        link.classList.remove('profile-modal__tab-link--active');
      });
      tabLink.classList.add('profile-modal__tab-link--active');
      profileModalSections.forEach((profileModalSection) => {
        profileModalSection.classList.add('hidden');
      });
      const sectionOfTabLink = profileModal.querySelector(`.${tabLink.dataset.section}`);
      sectionOfTabLink.classList.remove('hidden');
    });
  }

  // Переключение аватаров
  for (let gameAvatar of gameAvatars) {
    gameAvatar.addEventListener('click', () => {
      resultAvatar.src = gameAvatar.src;
    });
  }

  // Функционал загрузки собственного аватара
  uploadAvatarInput.addEventListener('change', () => {
    const file = uploadAvatarInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      resultAvatar.src = evt.target.result;
    });
    reader.readAsDataURL(file);
  });

  // Сохранение данных
  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    playerData.profile.avatar = resultAvatar.src;
    playerData.profile.name = playerNameInput.value;
    saveData(playerData);
    hideProfileModal();
    profileAvatar.src = playerData.profile.avatar;
    profileName.textContent = playerData.profile.name;
  });

  // Отмена
  cancelButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resultAvatar.src = playerData.profile.avatar;
    playerNameInput.value = playerData.profile.name;
    hideProfileModal();
  });

  // Сброс прогресса
  resetButton.addEventListener('click', () => {
    resetData();
    location.reload();
  });
}

headerProfile.addEventListener('click', showProfileModal);
