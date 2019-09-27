import React from 'react';
import './App.css';

import {Route} from 'react-router-dom';

//import Youtube from './Youtube';

import Login_Card from './login_page';

import Forgot_Password from './pages/forgot_password';

import NewUser from './pages/newuser';
import Homepage from './pages/Homepage';

function App() {
  return (
    <div className="App col-lg-12">

      <Route path='/' exact component={Login_Card}/>
      <Route path='/forgot' exact component={Forgot_Password} />
      <Route path='/newUser' exact component={NewUser} />
      <Route path='/home' exact component={Homepage}/>
      
      


    </div>
  );
}

export default App;
