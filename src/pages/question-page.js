/* eslint-disable require-jsdoc */
import store from '../store';
import './option-item';

class QuestionPage extends HTMLElement {
  connectedCallback() {
    this._questions = store.getState();
    this._correctAnswer = [];
    this._userAnswer = [];

    for (let i = 0; i < 10; i++) {
      this._correctAnswer.push(this._questions.data.questions[i].correctAnswer);
      this._userAnswer.push(null);
    }

    console.log(this._correctAnswer);
    console.log(this._userAnswer);

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
    const userAnswer = this._userAnswer;
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
    const cardBody = this.querySelector('#card-body');

    for (let i = 0; i < answers.length; i++) {
      const optionItem = document.createElement('option-item');
      optionItem.answerText = answers[i];
      optionItem.answerIndex = i;
      if (answers[i] === userAnswer[index]) {
        optionItem.querySelector('input').checked = true;
      }
      console.log(answers[i], userAnswer[i]);
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
  }
}

customElements.define('question-page', QuestionPage);
