import React from 'react';
import ReactDOM from 'react-dom';
import GenericDropdown from './GenericDropdown';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GenericDropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});