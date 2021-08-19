/* eslint-disable require-jsdoc */
import axios from 'axios';
import store from '../store';
import shuffle from '../utils/shuffleArray';

class StartPage extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `<h1 class="passion text-white">Please wait...</h1>`;
    if (store.getState().categories) {
      this._categories = store.getState().categories;
    } else {
      const result = await axios.get('https://opentdb.com/api_category.php');
      store.dispatch({
        type: 'ADD_CATEGORIES',
        data: {
          categories: result.data.trivia_categories,
        },
      });
      this._categories = store.getState().categories;
    }
    this.render();
  }

  render() {
    const categories = this._categories;
    this.innerHTML = `
        <div id="start-page" class="d-flex flex-column align-items-center">
          <h1 class="passion text-white">OneMinuteQuiz</h1>
          <select 
            id="category" 
            class="form-select open-sans mt-1 py-3 text-black-50"
          >
          </select>
          <button
            class="
              btn btn-success
              rounded-pill
              open-sans
              fw-bold
              mt-4
              w-50
              py-3
              py-md-3
            "
          >
            Start
          </button>
        </div>
    `;
    const rootElement = document.querySelector('#root');
    const category = this.querySelector('#category');
    const startBtn = this.querySelector('button');

    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement('option');
      option.innerText = categories[i].name;
      option.setAttribute('value', categories[i].id);
      this.querySelector('#category').appendChild(option);
    }

    startBtn.addEventListener('click', async () => {
      let finalResult = [];
      startBtn.innerText = 'Please wait...';
      const endpoint = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=easy&type=multiple`);
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
      const questionPage = document.createElement('question-page');
      const classQuest = 'd-flex flex-column align-items-center';
      questionPage.setAttribute('class', classQuest);
      rootElement.appendChild(questionPage);
      this.remove();
    });
  }
}

customElements.define('start-page', StartPage);

