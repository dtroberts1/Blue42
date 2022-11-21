import React from 'react';
import ReactDOM from 'react-dom';
import CreateGameModalContent from './CreateGameModalContent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateGameModalContent />, div);
  ReactDOM.unmountComponentAtNode(div);
});