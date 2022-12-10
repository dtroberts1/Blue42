import logo from './logo.svg';
import './App.less';
import Sim from './components/Sim/Sim';
import ManageOdds from './components/ManageOdds/ManageOdds';
import { ReactNode } from 'react';
import React from 'react';

export default class App extends React.Component {

  constructor(props : any){
    super(props);
  }
  render(): ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <Sim />
          <ManageOdds />
        </header>
      </div>
    ); 
  }
}