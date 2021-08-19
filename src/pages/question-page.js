/* eslint-disable require-jsdoc */
import store from '../store';
import './option-item';

class QuestionPage extends HTMLElement {
  connectedCallback() {
    this._questions = store.getState();
    this._correctAnswer = [];
    this._userAnswer = [];

    for (let i = 0; i < 10; i++) {
      this._correctAnswer.push(this._questions.questions[i].correctAnswer);
      this._userAnswer.push(null);
    }

    this._questionIndex = 0;
    this._answers = [];
    this._startCountDown = 60;
    this.render();
    this.countDown();
  }

  set questionIndex(val) {
    this._questionIndex = val;
    this.render();
  }

  onNextClick() {
    this._questionIndex++;
    this.render();
  }

  onPrevClick() {
    this._questionIndex--;
    this.render();
  }

  countDown() {
    const count = () => {
      if (this._startCountDown === 0) {
        clearInterval(countId);
        this.setResult(this.getResult());
        const resultPage = document.createElement('result-page');
        resultPage.setAttribute('class', 'd-flex justify-content-center');
        document.querySelector('#root').appendChild(resultPage);
        this.remove();
      } else {
        this._startCountDown--;
        this.querySelector('#timer').innerText = `${this._startCountDown}`;
      }
    };
    const countId = setInterval(count, 1000);
  }

  getResult() {
    const userAnswer = this._userAnswer;
    const correctAnswer = this._correctAnswer;
    let result = 0;

    for (let i = 0; i < correctAnswer.length; i++) {
      if (userAnswer[i] === correctAnswer[i]) {
        result += 10;
      }
    }

    return result;
  }

  setResult(val) {
    store.dispatch({
      type: 'ADD_RESULT',
      data: {
        result: val,
      },
    });
  }

  render() {
    const questions = this._questions.questions;
    const index = this._questionIndex;
    const answers = questions[index].answers;
    const userAnswer = this._userAnswer;

    this.innerHTML = `
      <h1 id="timer" class="text-white passion">${this._startCountDown}</h1>
      <div class="card px-2 d-flex flex-row align-items-center">
        <button
          id="previous"
          type="button"
          class="btn btn-secondary rounded-circle py-2 order-1"
        >
          <i class="bi bi-chevron-left fs-6"></i>
        </button>
        <button
          id="next"
          type="button"
          class="btn btn-secondary rounded-circle py-2 order-3"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
        <div
          id="card-body"
          class="card-body d-flex flex-column order-2 mx-2 mx-md-4"
        >
          <p class="card-text open-sans">${questions[index].question}</p>
        </div>
      </div>
      <button
        id="finish"
        type="button"
        class="btn btn-success mt-3 rounded-pill px-4 py-2 open-sans fw-bold"
      >
        Finish
      </button>
    `;
    const cardBody = this.querySelector('#card-body');
    const buttonFinish = this.querySelector('#finish');

    for (let i = 0; i < answers.length; i++) {
      const optionItem = document.createElement('option-item');
      optionItem.setAttribute('class', 'mb-2');
      optionItem.answerText = answers[i];
      optionItem.answerIndex = i;
      if (answers[i] === userAnswer[index]) {
        optionItem.querySelector('input').checked = true;
      }
      cardBody.appendChild(optionItem);
    }

    const nextBtn = this.querySelector('#next');
    const prevBtn = this.querySelector('#previous');
    const optionItem = this.querySelectorAll('option-item');

    nextBtn.addEventListener('click', () => {
      if (this._questionIndex !== questions.length - 1) {
        this.onNextClick();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (this._questionIndex !== 0) {
        this.onPrevClick();
      }
    });

    optionItem.forEach( (btn) => {
      btn.addEventListener('click', () => {
        this._userAnswer[index] = btn.getAnswerText;
      });
    });

    buttonFinish.addEventListener('click', () => {
      this._startCountDown = 0;
    });
  }
}

customElements.define('question-page', QuestionPage);
