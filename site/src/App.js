import React from 'react';
//import logo from './logo.svg';
import './App.css';


import {BrowserRouter as Router,Redirect,Route,Switch} from  'react-router-dom';

import Home from './pages/home/Home';
import Projetos from './pages/projetos/projetos'
import Contato from './pages/contato/contato'

import MainNavigation from './components/navigation/MainNavigation'

function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route path="/home" exact>
            <Home/>
          </Route>
          <Route path="/portifolio" exact>
            <Projetos/>
          </Route>
          <Route path="/contato" exact>
            <Contato/>
          </Route>
          <Redirect to="/home" />
        </Switch>
      </main>
    
   </Router>
  );
}

export default App;
