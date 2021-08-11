import axios from 'axios';
import './pages/start-page.js';

const main = () => {
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<start-page></start-page>';
  const startPage = document.querySelector('start-page');


  const onStartButtonClick = async () => {
    const result = await axios.get(`https://opentdb.com/api.php?amount=10&category=${startPage.category}&difficulty=easy&type=multiple`);
    console.log(result.data.results);
  };

  startPage.onClick = onStartButtonClick;
};

export default main;
