import { START_QUIZ_BUTTON_ID, USERNAME_INPUT_ID } from '../constants.js';
import { quizData } from '../data.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1>Welcome, <input type="text" id="${USERNAME_INPUT_ID}" value="" placeholder=" What is your name?"></h1>
    <button id="${START_QUIZ_BUTTON_ID}">start quiz</button>
  `;
  return element;
};
