import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';


import Home from './components/Home';
import Posts from './components/Posts';
import Details from './components/Details';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route
        path="/"
        component={Home} 
        exact/>

        <Route
        path="/posts"
        component={Posts}
        exact />

        <Route
        path="/details"
        component={Details}
        exact />

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
