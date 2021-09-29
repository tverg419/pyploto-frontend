import './App.css';
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
// import { LoginContext } from './components/LoginContext.jsx';

import Nav      from './components/Nav.jsx'
import Feed     from './components/Feed.jsx'
import Search   from './components/Search.jsx'
import Profile  from './components/.jsx'
import Login    from './components/Login.jsx'
import Signup   from './components/Signup.jsx'
import SuccessPost    from './components/SuccessPost.jsx'
import DetailPost     from './components/DetailPost.jsx'
import CreatePost     from './components/CreatePost.jsx'
import axiosInstance  from './axios.js';

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
          <Nav handleLogout={handleLogout}/>          
      </div>

      <div className="App-main">
        <Switch>
          <Route exact path="/feed" component={Feed}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/search' component={Search}/>
          <Route exact path='/' component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/posts/create" component={CreatePost}/>
          <Route exact path="/posts/success" component={SuccessPost}/>
          <Route exact path="/posts/:id" render={(routerProps) => <DetailPost id={routerProps.match.params.id}/> }/>
          <Route path='/' render={() => {<Signup/>}}/>
        </Switch>
      </div>

      {/* <div className="App-footer">
        <h1>Footer</h1>
      </div> */}
{/* 
      </LoginContext.Provider> */}
    </div>
  );
}

export default App;
