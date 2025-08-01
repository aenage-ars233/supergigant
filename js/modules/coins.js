import { playerData } from "../game-settings.js";

const headerCoins = document.querySelector('.page-header__coins');
const headerCoinsCounter = headerCoins.querySelector('.page-header__coins-counter');

headerCoinsCounter.textContent = playerData.coins;
