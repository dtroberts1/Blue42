import React from 'react';
import ReactDOM from 'react-dom/client';
import GenericModal from './GenericModal';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  root.render(<GenericModal />);
});