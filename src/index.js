import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import App, { UPDATE_USER, UPDATE_INVOICE, UPDATE_RANDOM_TEXT } from './App';


const baseState = {
  user: {
    name: 'John',
    surname: 'Doe',
  },
  invoice: {
    tomatoes: 1,
    blackberries: 2,
  },
  randomText: '',
}

const store = createStore(userReducer)

ReactDOM.render(
  <React.StrictMode>
    <h1>Watch for passing whole objects as props! Here's why:</h1>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

function userReducer(state = baseState, action) {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case UPDATE_INVOICE: {
      return {
        ...state,
        invoice: {
          ...state.invoice,
          [action.payload.field]: action.payload.value,
        }
      }
    }
    case UPDATE_RANDOM_TEXT: {
      return {
        ...state,
        randomText: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}
