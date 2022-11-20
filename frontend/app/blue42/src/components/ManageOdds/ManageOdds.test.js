import React from 'react';
import ReactDOM from 'react-dom';
import ManageOdds from './ManageOdds';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManageOdds />, div);
  ReactDOM.unmountComponentAtNode(div);
});