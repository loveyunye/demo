// import { createStore } from 'redux';
const { createStore } = require('redux');
// const timeout = function() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, 2000);
//   })
// }
const reducer = (state = { count : 0 }, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { count: state.count + 1 };
    case 'DECREASE':
      return { count: state.count - 1 };
    default: return state;
  }
};

const actions = {
  // increase: async () => {
  //   await timeout();
  //   return {type: 'INCREASE'}
  // },
  increase: () => {
    return {type: 'INCREASE'}
  },
  decrease: () => ({type: 'DECREASE'}),
}

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

export {
  store,
  actions,
};

