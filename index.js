import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './src/component/Header/Header';
import Content from './src/component/Content/Content';

/* eslint-disable */
const App = () => (
  <React.Fragment>
    <Header />
    <Content />
  </React.Fragment>
);
/* eslint-enable */

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
