import React from 'react';
import ReactDOM from 'react-dom';
import Sim from './Sim';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sim />, div);
  ReactDOM.unmountComponentAtNode(div);
});