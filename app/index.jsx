import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Home from './containers';
import './../styles/index.scss';
import store from './store';

const renderIndex = (domElement) => {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>
    , domElement);
};

global.renderIndex = renderIndex;
module.exports = renderIndex;
