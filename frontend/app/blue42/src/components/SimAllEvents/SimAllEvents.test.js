import React from 'react';
import ReactDOM from 'react-dom';
import SimAllEvents from './SimAllEvents';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SimAllEvents />, div);
  ReactDOM.unmountComponentAtNode(div);
});