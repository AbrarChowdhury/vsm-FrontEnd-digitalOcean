import { Cards, Patient } from './components';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Cards />
          </Route>
          <Route exact path="/:bed" children={<Patient />}>
          </Route>
        </Switch>
      </div>
    </Router> 
      </div>
  );
}

export default App;
