import React from 'react';
import ReactDOM from 'react-dom';
import CreateOddsModalContent from './CreateOddsModalContent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateOddsModalContent />, div);
  ReactDOM.unmountComponentAtNode(div);
});