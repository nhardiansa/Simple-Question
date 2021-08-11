/* eslint-disable require-jsdoc */
import axios from 'axios';

class StartPage extends HTMLElement {
  constructor() {
    super();
    this._categories = [];
    // this._onClick =
  }

  set onClick(e) {
    this._onClick = e;
    this.render();
  }

  get category() {
    return this.querySelector('#category').value;
  }

  async connectedCallback() {
    const result = await axios.get('https://opentdb.com/api_category.php');
    this._categories = result.data.trivia_categories;
    console.log(this._categories);
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
              px-4
              py-3
              px-md-5
              py-md-3
            "
          >
            Start
          </button>
        </div>
    `;
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement('option');
      option.innerText = categories[i].name;
      option.setAttribute('value', categories[i].id);
      this.querySelector('#category').appendChild(option);
    }

    this.querySelector('button').addEventListener('click', this._onClick);
  }
}

customElements.define('start-page', StartPage);

