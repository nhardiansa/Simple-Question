/* eslint-disable require-jsdoc */
import store from '../store';
import './option-item';

class QuestionPage extends HTMLElement {
  connectedCallback() {
    this._questions = store.getState();
    this._questionIndex = 0;
    this._answers = [];
    this.render();
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

  render() {
    const questions = this._questions.data.questions;
    const index = this._questionIndex;
    const answers = questions[index].answers;
    this.innerHTML = `
      <h1 id="timer" class="text-center text-white">30</h1>
      <div class="question d-flex align-items-center">
        <button
          id="previous"
          type="button"
          class="btn btn-secondary rounded-pill order-1"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          id="next"
          type="button"
          class="btn btn-secondary rounded-pill order-3"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
        <div class="card px-3 order-2" style="width: 18rem">
          <div id="card-body" class="card-body d-flex flex-column">
            <p class="card-text">
              ${questions[index].question}
            </p>
          </div>
        </div>
      </div>
    `;
    const nextBtn = this.querySelector('#next');
    const prevBtn = this.querySelector('#previous');

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


    const cardBody = this.querySelector('#card-body');
    answers.forEach( (text) => {
      const optionItem = document.createElement('option-item');
      optionItem.questionText = text;
      cardBody.appendChild(optionItem);
    });
  }
}

customElements.define('question-page', QuestionPage);
