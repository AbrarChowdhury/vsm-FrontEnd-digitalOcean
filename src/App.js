import { Patient } from './components';
import Dashboard from './pages/dashboard/dashboard'
import LandingPage from './pages/landingPage/landingPage.component'
import AddPatientForm from './components/patient/addPatientForm.component'
import RemovePatientForm from './components/patient/RemovePatientForm.component'
import UpdatePatient from './components/patient/updatePatientForm.component'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

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
            <Route exact path="/:bed" children={<Patient />}>
            </Route>
            <Route exact path="/updatePatient/:bed" children={<UpdatePatient />}>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
