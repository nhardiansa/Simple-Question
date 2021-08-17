import axios from 'axios';
import store from './store.js';
import shuffle from './utils/shuffleArray.js';
import './pages/start-page.js';
import './pages/question-page.js';
import './pages/result-page.js';

const main = () => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<start-page></start-page>';
  const startPage = document.querySelector('start-page');
  // store.subscribe(() => {
  //   const result = store.getState().result;
  //   if (result || result === 0) {
  //     changeToResultPage();
  //   };
  // });


  const onStartButtonClick = async () => {
    let finalResult = [];
    const endpoint = await axios.get(`https://opentdb.com/api.php?amount=10&category=${startPage.category}&difficulty=easy&type=multiple`);
    const result = endpoint.data.results;
    result.forEach( (e) => {
      const category = e.category;
      const question = e.question;
      const answers = shuffle([...e.incorrect_answers, e.correct_answer]);
      const correctAnswer = e.correct_answer;

      finalResult = [
        ...finalResult,
        {category, question, answers, correctAnswer},
      ];
    });
    store.dispatch({
      type: 'ADD_QUESTIONS',
      data: {
        questions: finalResult,
      },
    });
    // console.log(store.getState());
    rootElement.innerHTML = '<question-page></question-page>';
  };

  // const changeToResultPage = () => {
  //   rootElement.innerHTML = '<result-page></result-page>';
  // };

  startPage.onClick = onStartButtonClick;
};

export default main;
