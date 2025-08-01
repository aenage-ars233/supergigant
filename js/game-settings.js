import { loadData } from "./utils.js";

let playerData = loadData();

if (!playerData) {
  playerData = {
    profile: {
      name: 'Игрок',
      avatar: 'img/avatars/main-hero.png'
    },
    lifes: {
      lifesCount: 5,
      lastLifeLostAt: null,
      minutes: 0,
      seconds: 0,
    },
    coins: 250,
    progress: {
      currentLevel: 1,
      isWatchStartVideo: false,
      scenes: {
        isScene1: false,
      },
      tasks: {
        taskNumber: 1,
        taskProgress: 0,
      },
    },
    gameRuleset: {
      maxLifes: 5,
      prices: {
        lifes: 90,
      }
    },
  };
}

export { playerData };
