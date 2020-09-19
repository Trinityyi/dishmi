import { createStore as reduxCreateStore } from 'redux';

const initialState = {
  user: {},
  menu: {}
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'INIT_MENU':
    return {
      ...state,
      menu: action.menu
    };
  default:
    return state;
  }
};


const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
