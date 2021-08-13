/* eslint-disable require-jsdoc */
class OptionItem extends HTMLElement {
  set questionText(text) {
    this._questionText = text;
    this.render();
  }

  render() {
    const questionText = this._questionText;
    this.innerHTML = `
        <input
          type="checkbox"
          class="btn-check"
          id="1"
          autocomplete="off"
        />
        <label class="btn btn-outline-secondary w-100" for="1"
          >${questionText}</label
        >
    `;
  }
}

customElements.define('option-item', OptionItem);
