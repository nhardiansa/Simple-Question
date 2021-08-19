import './pages/start-page.js';
import './pages/question-page.js';
import './pages/result-page.js';

const main = () => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<start-page></start-page>';
};

export default main;
