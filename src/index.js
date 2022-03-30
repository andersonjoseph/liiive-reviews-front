import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://liiive-reviews.herokuapp.com';

function AlertTemplate({ style, options, message, close }) {
  let classList = 'm-2 p-4 rounded-lg outline outline-2';
  classList += ' ';

  switch (options.type) {
    case 'info':
      classList += 'bg-teal-200 outline-teal-300 text-teal-800';
      break;

    case 'success':
      classList += 'bg-green-200 outline-green-300 text-green-800';
      break;

    case 'error':
      classList += 'bg-red-200 outline-red-300';
      break;

    default:
      break;
  }

  return (
    <div className={classList}>
      {options.type === 'info'}
      {options.type === 'success'}
      {options.type === 'error'}
      {message}
      <button className="ml-4" onClick={close}>
        &#10006;
      </button>
    </div>
  );
}

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
