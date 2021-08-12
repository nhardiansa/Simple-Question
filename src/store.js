const {createStore} = require('redux');

// state awal
const initialState = {data: ''};

// reducer
const reducer = (prevState=initialState, action) => {
  const data = action.data;
  switch (action.type) {
    case 'ADD_EP':
      return {...prevState, data};
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
