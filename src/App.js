import './App.css';
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
// import { LoginContext } from './components/LoginContext.jsx';

import Nav      from './components/Nav.jsx'
import Feed     from './components/Feed.jsx'
import Search   from './components/Search.jsx'
import Profile  from './components/Profile.jsx'
import Login    from './components/Login.jsx'
import Signup   from './components/Signup.jsx'
import axiosInstance from './axios.js';

function App() {

  const [loginStatus, setLoginStatus] = useState(false)
  
  async function handleLogout() {
    const response = await axiosInstance.post('/blacklist/', {
      'refresh_token': localStorage.getItem('refresh_token')
    })
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('username')
    axiosInstance.defaults.headers['Authorization'] = null;
    setLoginStatus(false)
    return response
  }

  return (
    
    <div className="App">
      {/* <LoginContext.Provider value={loginStatus}> */}
      
      <div className="App-header">
          <Nav/>          
      </div>

      <div className="App-main">
        <Switch>
          <Route exact path="/feed" component={Feed}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/search' component={Search}/>
          <Route exact path='/' component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route path='/' render={() => {<Signup/>}}/>
        </Switch>
      </div>

      <div className="App-footer">
        <h1>Footer</h1>
      </div>
{/* 
      </LoginContext.Provider> */}
    </div>
  );
}

export default App;
