/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('button'); // Create a button element
  element.classList.add('answer-option'); // Add a class for styling
  element.innerHTML = String.raw`
    ${key}: ${answerText}
  `;
  element.dataset.key = key; // Store the key as a data attribute
  return element;
};

// Export answer element to be used in questionPage.js
