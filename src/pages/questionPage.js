import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  SKIP_QUESTION_BUTTON_ID,
  CORRECT_ANSWER_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

const questionElement = createQuestionElement(currentQuestion.text);
   userInterface.appendChild(questionElement);

  const answersListElement = document.createElement('ul');
  answersListElement.id = ANSWERS_LIST_ID;
  userInterface.appendChild(answersListElement);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText); 
    
    answersListElement.appendChild(answerElement);
    
    answerElement.addEventListener('click', () => {
      handleAnswerSelection(key, answerElement);
      showCorrectAndSelectedAnswers(key);
    });
  }

  const nextButton = document.createElement('button');
  nextButton.id = NEXT_QUESTION_BUTTON_ID;
  nextButton.textContent = 'Next Question';
  nextButton.addEventListener('click', nextQuestion);
  buttonContainer.appendChild(nextButton);

  const skipButton = document.createElement('button');
  skipButton.id = SKIP_QUESTION_BUTTON_ID;
  skipButton.textContent = 'Skip Question';
  skipButton.addEventListener('click', skipQuestion);
  buttonContainer.appendChild(skipButton);

  userInterface.appendChild(buttonContainer);

};

const handleAnswerSelection = (selectedKey, selectedElement) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected = selectedKey;

  if (selectedKey === currentQuestion.correct) {
    quizData.score += 10;
    selectedElement.classList.add('correct-answer');
  } else {
    selectedElement.classList.add('wrong-answer');
  }
  disableAllButtons();
  };

  const disableAllButtons = () => {
    const answerButtons = document.querySelectorAll(`#${ANSWERS_LIST_ID} li`);
    answerButtons.forEach(button => {
      button.style.pointerEvents = 'none'; 
    });
  };

  const showCorrectAndSelectedAnswers = (selectedKey) => {
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const answerButtons = document.querySelectorAll(`#${ANSWERS_LIST_ID} li`);

  answerButtons.forEach((button) => {
    const answerKey = button.dataset.key; // Ensure that createAnswerElement sets this data attribute

    if (answerKey === currentQuestion.correct) {
      button.classList.add('correct-answer');
    }
    
    if (answerKey === selectedKey && selectedKey !== currentQuestion.correct) {
      button.classList.add('wrong-answer');
    }
  });
};


const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  if (quizData.currentQuestionIndex < quizData.questions.length) {
    initQuestionPage();
  } else {
    displayQuizEnd();
  }
};

const skipQuestion = () => {
  document.getElementById(CORRECT_ANSWER_BUTTON_ID).style.color = 'green';
};

const displayQuizEnd = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);

  let resultMessage;
  if (quizData.score >= 50) {
    resultMessage = `<h2>Congratulations! You win the quiz!</h2>`
  } else {
    resultMessage = `<h2>Sorry, you lose the quiz. Better luck next time!`
  }

  userInterface.innerHTML = `
  <h1>Quiz Complete! Thank you for playing!</h1>
  <h2>Your Final Score is: ${quizData.score}</h2>
  ${resultMessage}
  `;

}
