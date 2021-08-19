const {createStore} = require('redux');

// state awal
const initialState = {};

// reducer
const reducer = (prevState=initialState, action) => {
  const data = action.data;
  switch (action.type) {
    case 'ADD_CATEGORIES':
      const categories = data.categories;
      return {...prevState, categories};
      break;

    case 'ADD_QUESTIONS':
      const questions = data.questions;
      return {...prevState, questions};
      break;

    case 'ADD_RESULT':
      const result = data.result;
      return {...prevState, result};
      break;

    default:
      return prevState;
      break;
  }
};

// store
const store = createStore(reducer);

// console.log(store.getState());

// store.dispatch({
//   type: 'ADD_EP',
//   data: 'ini result soal',
// });

// console.log(store.getState());

export default store;

