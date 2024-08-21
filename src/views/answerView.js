/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.innerHTML = String.raw`
    ${key}: ${answerText};
  `;
  element.classList.add('answer-option');
  element.addEventListener('click', () => handleAnswerClick(key, element));
  return element;
};
