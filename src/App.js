import { Patient } from './components';
import Dashboard from './pages/dashboard/dashboard'
import LandingPage from './pages/landingPage/landingPage.component'
import AddPatientForm from './components/patient/addPatientForm.component'
import RemovePatientForm from './components/patient/RemovePatientForm.component'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.styles.scss'
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/add-patient">
              <AddPatientForm />
            </Route>
            <Route exact path="/remove-patient">
              <RemovePatientForm />
            </Route>
            <Route exact path="/:bed">
              <Patient/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
