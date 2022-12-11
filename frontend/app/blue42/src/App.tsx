import logo from './logo.svg';
import './App.less';
import Sim from './components/Sim/Sim';
import ManageOdds from './components/ManageOdds/ManageOdds';
import { ReactNode } from 'react';
import React from 'react';

const App: () => JSX.Element = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Sim />
        <ManageOdds />
      </header>
    </div>
  ); 
}

export default App;