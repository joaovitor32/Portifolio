import React from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import {useAuth} from './components/hooks/auth-hooks';
import AuthContext from './components/context/auth-context';

import Mensagem from './pages/mensagens';
import Portifolio from './pages/portifolio';
import NovoProjeto from './pages/NovoProjeto';
import Curso from './pages/curso';
import NovoCurso from './pages/NovoCurso';

import Login from './pages/login';
import Navigation from './components/UIElements/navigation/navigation'

function App() {
  
  let routes;

  const {token,login,logout,userId}=useAuth();

  if(token){
    routes=(
      <Switch>
        <Route path="/mensagem" exact>
          <Mensagem/>
        </Route>
        <Route path="/portifolio" exact>
          <Portifolio/>
        </Route>
        <Route path="/novoprojeto" exact>
          <NovoProjeto/>
        </Route>
        <Route path="/cursos" exact>
          <Curso/>
        </Route>
        <Route path="/novocurso" exact>
          <NovoCurso/>
        </Route>
        <Redirect to="/mensagem"/> 
      </Switch>
    ) 
  }else{
    routes=(
      <Switch>
        <Route path="/login" >
          <Login/>
        </Route>
        <Redirect to="/login" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ 
          isLoggedIn:!!token,
          token:token , 
          login: login, 
          logout: logout, 
          userId:userId
      }}
    >
      <Router>
        <Navigation/>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
