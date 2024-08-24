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

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  answersListElement.innerHTML = '';

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);

    answerElement.addEventListener('click', () => {
      handleAnswerSelection(key);
      showCorrectAndSelectedAnswer(key);
    });
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', skipQuestion);
};

const handleAnswerSelection = (selectedKey) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected = selectedKey;

  if (selectedKey === currentQuestion.correct) {
    quizData.score += 10;
  }

  disableAnswerButtons();
};

const showCorrectAndSelectedAnswer = (selectedKey) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const answerButtons = document.querySelectorAll(
    `#${ANSWERS_LIST_ID} .answer-option`
  );

  answerButtons.forEach((button) => {
    const answerKey = button.dataset.key;

    if (answerKey === currentQuestion.correct) {
      button.classList.add('correct-answer');
    }

    if (answerKey === selectedKey && selectedKey !== currentQuestion.correct) {
      button.classList.add('wrong-answer');
    }
  });
};

const disableAnswerButtons = () => {
  const answerButtons = document.querySelectorAll(
    `#${ANSWERS_LIST_ID} .answer-option`
  );
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
};

const nextQuestion = () => {
  quizData.currentQuestionIndex++;

  if (quizData.currentQuestionIndex < quizData.questions.length) {
    initQuestionPage();
  } else {
    displayQuizEnd();
  }
};

const skipQuestion = () => {
  nextQuestion();
};

const displayQuizEnd = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);

  let resultMessage;
  if (quizData.score >= 50) {
    resultMessage = `<h2>Congratulations! You win the quiz!</h2>`;
  } else {
    resultMessage = `<h2>Sorry, you lose the quiz. Better luck next time!</h2>`;
  }

  userInterface.innerHTML = `
    <h1>Quiz Complete! Thank you for playing!</h1>
    <h2>Your Final Score is: ${quizData.score}</h2>
    ${resultMessage}
  `;
};
