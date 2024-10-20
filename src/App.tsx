import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientManagement from './components/PatientManagement';
import AppointmentScheduling from './components/AppointmentScheduling';
import MedicalRecords from './components/MedicalRecords';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/records">Medical Records</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/patients" component={PatientManagement} />
          <Route path="/appointments" component={AppointmentScheduling} />
          <Route path="/records" component={MedicalRecords} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;