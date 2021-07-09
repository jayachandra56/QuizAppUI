import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../screens/Dashboard';
import Instructions from '../screens/Instructions';
import Result from '../screens/Result';
function Routings() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Instructions} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/result" component={Result} />
          </Switch>
        </Router>
    )
}

export default Routings
