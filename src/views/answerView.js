/**
 * Create an Answer element
 * @param {string} key
 * @param {string} answerText
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('button');
  element.classList.add('answer-option');
  element.innerHTML = `${answerText}`;
  element.dataset.key = key;
  return element;
};
