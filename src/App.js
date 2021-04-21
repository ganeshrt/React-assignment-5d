
import './App.css';
import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Registration } from './page/Registration/Registration';
import { LoginPage } from './page/Login/LoginPage';
import Moments from './page/Moments/Moments';

function App() {
  const [token, setToken] = useState();

  // if (!token) {
  //   return <LoginPage setToken={setToken} />
  // }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <Registration />
        </Route>
        <Route path="/moments">
          <Moments></Moments>
        </Route>
        <Route path="/create">
          <div>create Moment</div>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
