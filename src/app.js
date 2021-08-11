import './pages/start-page.js';

const main = () => {
  const rootElement = document.querySelector('#root');
  const startPage = '<start-page></start-page>'
  rootElement.innerHTML = startPage
}

export default main;