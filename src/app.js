// import axios from 'axios';
import store from './store.js';
import './pages/start-page.js';
import './pages/question-page.js';
import './pages/result-page.js';

const main = () => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<start-page></start-page>';
  const startPage = document.querySelector('start-page');


  const onStartButtonClick = () => {
    // const endpoint = axios.get(`https://opentdb.com/api.php?amount=10&category=${startPage.category}&difficulty=easy&type=multiple`);
    // questions = endpoint.data.results;
    // questions.forEach( (e) => {
    //   const category = e.category;
    //   const question = e.question;
    //   const answers = [...e.incorrect_answers, e.correct_answer];
    //   const correctAnswer = e.correct_answer;

    //   e = {category, question, answers, correctAnswer};
    //   console.log(e);
    // });
    console.log(store.getState());
    store.dispatch({
      type: 'ADD_EP',
      data: `https://opentdb.com/api.php?amount=10&category=${startPage.category}&difficulty=easy&type=multiple`,
    });
    console.log(store.getState());
    rootElement.innerHTML = '<question-page></question-page>';
  };

  startPage.onClick = onStartButtonClick;
};

export default main;
