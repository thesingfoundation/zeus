import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import States from './Components/Polling/States';
import Lga from './Components/Polling/LGA';
import Wards from './Components/Polling/Wards';
import Units from './Components/Polling/Units';
import StateReport from './Components/StateReport';
import Reports from './Components/Reports';
import ReportComments from './Components/ReportComments'
import Comment from './Components/Comment'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Switch>
          <Navbar>
            <Route exact path="/" component={Home} />
            <Route exact path="/states" component={States} />
            <Route exact path="/states/:id" component={Lga} />
            <Route exact path="/states/:stateId/:lgaId" component={Wards} />
            <Route exact path="/states/:stateId/:lgaId/:wardId" component={Units} />
            <Route exact path="/statereport/:id" component={StateReport}/>
            <Route exact path="/reports" component={Reports}/>
            <Route exact path="/reportdetails/:id" component={ReportComments}/>
            <Route exact path="/comment/:id" component={Comment}/>
          </Navbar>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
