import React from 'react';
import ReactDOM from 'react-dom';
import ManageOdd from './ManageOdd';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageOdd />, div);
  ReactDOM.unmountComponentAtNode(div);
});