import { playerData } from "../game-settings.js";

const taskTexts = [null,
  'Пройти по следам похитителей',
];
const taskNumber = playerData.progress.tasks.taskNumber;
const taskProgress = playerData.progress.tasks.taskProgress;

// Находим все необходимые элементы
const headerTask = document.querySelector('.page-header__task');
const headerTaskText = headerTask.querySelector('.page-header__task-text');
const headerTaskBar = headerTask.querySelector('.page-header__task-bar');

headerTaskText.textContent = taskTexts[taskNumber];
headerTaskBar.style.width = `${taskProgress}%`;
