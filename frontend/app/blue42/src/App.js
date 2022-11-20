import logo from './logo.svg';
import './App.less';
import Sim from './components/Sim/Sim';
import ManageOdds from './components/ManageOdds/ManageOdds';

function App() {
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
