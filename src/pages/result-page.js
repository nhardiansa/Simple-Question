/* eslint-disable require-jsdoc */
import store from '../store';

class ResultPage extends HTMLElement {
  connectedCallback() {
    this._finalResult = store.getState().result;
    this.render();
  }

  setResult(val) {
    store.dispatch({
      type: 'ADD_RESULT',
      data: {
        result: val,
      },
    });
  }

  setNullQuestions() {
    store.dispatch({
      type: 'ADD_QUESTIONS',
      data: {
        questions: [],
      },
    });
  }

  render() {
    const result = this._finalResult;
    let text;
    if (result >= 75) {
      text = 'Good Movement';
    } else if (result >= 40 && result <= 75 ) {
      text = 'Try more hard';
    } else if (result <= 40) {
      text = 'Maybe you want to retry';
    }
    this.innerHTML = `
      <div id="retry-card" class="card">
        <div class="card-body d-flex flex-column align-items-center">
          <h5 class="card-title text-center open-sans">Your result</h5>
          <h1 class="text-center my-2 my-md-3 passion">${result}</h1>
          <p class="card-text text-center mb-4 open-sans">${text}</p>
          <button
            id="retry"
            type="button"
            class="btn btn-success rounded-pill py-2 py-md-3 open-sans fw-bold"
          >
            Retry
          </button>
        </div>
      </div>
    `;

    const retryBtn = this.querySelector('#retry');

    retryBtn.addEventListener('click', () => {
      this.setResult(0);
      this.setNullQuestions();
      document.querySelector('#root').innerHTML = '<start-page></start-page>';
    });
  }
}

customElements.define('result-page', ResultPage);
