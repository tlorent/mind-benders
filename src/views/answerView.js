/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.classList.add('answer-option'); // add a class for styling
  element.innerHTML = String.raw`
    ${key}: ${answerText};
  `;
  
  
 
  return element;
};

 // export answer element to be used in questionPage.js




 
