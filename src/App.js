import React from 'react';
import './App.css';

import {Route} from 'react-router-dom';

//import Youtube from './Youtube';

import LoginPage from './loginPage';

import ForgotPassword from './pages/forgotPassword';

import NewUser from './pages/newUserRegistration';
import HomePage from './pages/Homepage';

function App() {
  return (
    <div className="App container-fluid">
      <Route path='/' exact component={LoginPage}/>
      <Route path='/forgot' exact component={ForgotPassword} />
      <Route path='/newUser' exact component={NewUser} />
      <Route path='/home' exact component={HomePage}/>
    </div>
  );
}

export default App;
