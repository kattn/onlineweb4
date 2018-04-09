import React from 'react';
import ReactDom from 'react-dom';
import App from './containers/App';
import './less/profiles.less';

require('es6-promise').polyfill();
require('isomorphic-fetch');

ReactDom.render(
  <App />,
  document.getElementById('profile'),
);
