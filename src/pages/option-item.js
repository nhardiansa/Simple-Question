/* eslint-disable require-jsdoc */
class OptionItem extends HTMLElement {
  set answerText(text) {
    this._answerText = text;
    this.render();
  }

  set answerIndex(index) {
    this._answerIndex = index;
    this.render();
  }

  set isChecked(val = false) {
    this._isChecked = val;
    this.render();
  }

  get getAnswerText() {
    return this._answerText;
  }

  render() {
    const answerText = this._answerText;
    const index = this._answerIndex;
    this.innerHTML = `
        <input
          type="radio"
          name="options-outlined"
          class="btn-check"
          id="${index}"
          autocomplete="off"
        />
        <label
          class="btn btn-outline-secondary w-100 open-sans"
          for="${index}"
          >${answerText}</label
        >
    `;
    this.querySelector('input').checked = this._isChecked;
  }
}

customElements.define('option-item', OptionItem);
