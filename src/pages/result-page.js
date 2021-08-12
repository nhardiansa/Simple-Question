/* eslint-disable require-jsdoc */
class ResultPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title text-center">Your result</h5>
          <h1 class="text-center">80</h1>
          <p class="card-text text-center">You are fast</p>
        </div>
      </div>
    `;
  }
}

customElements.define('result-page', ResultPage);
