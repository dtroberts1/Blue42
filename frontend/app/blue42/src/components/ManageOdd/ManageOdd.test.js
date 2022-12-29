import React from 'react';
import ReactDOM from 'react-dom/client';
import ManageOdd from './ManageOdd';
import {waitFor, screen, render} from '@testing-library/react';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);

  const { debug } = render(<ManageOdd />);
  debug();
  //debug(screen.getByRole("button"));
  //console.log({"screen":screen});
  //screen.debug();
  //fireEvent.click(tmpBtn)

});