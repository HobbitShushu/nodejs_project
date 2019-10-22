import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, Account, Board, BoardDetail, BoardWrite, Main, Picture, PictureWrite, PictureDetail } from 'pages' 
import { LoginProvider } from '../context/LoginContext'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home}/> 
        <LoginProvider>
          <Switch>
            <Route path='/account/login' component={Account}/>
          </Switch>
          <Switch>
            <Route exact path='/board/:name/write' component={BoardWrite}/>
            <Route exact path='/board/:name/:id' component={BoardDetail}/>
            <Route exact path='/board/:name' component={Board}/>
          </Switch>
          <Switch>
            <Route exact path='/picture/:name/write' component={PictureWrite}/>
            <Route exact path='/picture/:name/:id' component={PictureDetail}/>
            <Route path='/picture/:name' component={Picture}/>
          </Switch>
          
          <Route exact path='/user/:name' component={Main}/>
        </LoginProvider>

      </div>
    );
  }
}

export default App;

//<Route exact path='/board/:name' component={Board}/>
//<Route path='/profile/:name' component={Board}/>