import { loadData } from "./utils.js";

let playerData = loadData();

if (!playerData) {
  playerData = {
    profile: {
      name: 'Игрок',
      avatar: 'img/avatars/main-hero.png'
    }
  };
}

export { playerData };
