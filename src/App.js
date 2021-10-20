import './App.css';
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import { LoginProvider } from './components/LoginContext.jsx'
import Nav      from './components/Nav.jsx'
import Landing  from './components/Landing';
import Feed     from './components/Feed.jsx'
import Search   from './components/Search.jsx'
import Profile  from './components/Profile.jsx'
import Login    from './components/Login.jsx'
import Signup   from './components/Signup.jsx'
import SuccessPost    from './components/SuccessPost.jsx'
import DetailPost     from './components/DetailPost.jsx'
import CreatePost     from './components/CreatePost.jsx'
import EditPost       from './components/EditPost.jsx'

function App() {

  return (
    
    <div className="App">
        <LoginProvider>

      
      <div className="App-header">
          <Nav/>          
      </div>

      <div className="App-main">
            <Route exact path="/" component={Landing}/>
            <Route exact path="/home" component={Feed}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/search' component={Search}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/posts/create" component={CreatePost}/>
            <Route exact path="/posts/success" component={SuccessPost}/>
            <Route exact path="/posts/:id" render={(routerProps) => <DetailPost id={routerProps.match.params.id}/> }/>
            <Route exact path="/posts/:id/edit" render={(routerProps) => <EditPost id={routerProps.match.params.id}/> }/>
            <Route path='/' render={() => {<Landing/>}}/>
      </div>
      
      </LoginProvider>
    </div>
  );
}

export default App;
