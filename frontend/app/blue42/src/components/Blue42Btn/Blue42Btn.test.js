import React from 'react';
import ReactDOM from 'react-dom';
import Blue42Btn from './Blue42Btn';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Blue42Btn />, div);
  ReactDOM.unmountComponentAtNode(div);
});