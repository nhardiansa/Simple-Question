/* eslint-disable require-jsdoc */
class QuestionPage extends HTMLElement {
  connectedCallback() {
    this._questionIndex = 1;
    this.render();
  }

  render() {
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
          <div class="card-body d-flex flex-column">
            <p class="card-text">
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </p>
            <div class="option">
              <input
                type="checkbox"
                class="btn-check"
                id="1"
                autocomplete="off"
              />
              <label class="btn btn-outline-secondary w-100" for="1"
                >Checked</label
              >
            </div>
            <div class="option">
              <input
                type="checkbox"
                class="btn-check"
                id="1"
                autocomplete="off"
              />
              <label class="btn btn-outline-secondary w-100" for="1"
                >Checked</label
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('question-page', QuestionPage);
