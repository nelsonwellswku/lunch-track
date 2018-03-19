import React from 'react';
import { Grid } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import MainNav from './components/main-nav/MainNav';
import Register from './components/register/Register';

const SignIn = () => (<h1>Sign In Component</h1>);

const App = () => (
  <div>
    <MainNav />

    <Router>
      <Grid>
        <Route exact path="/" component={Home} />
        <Route path="/authentication/signin" component={SignIn} />
        <Route path="/authentication/register" component={Register} />
      </Grid>
    </Router>
  </div>
);

export default App;
