import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Project from './components/Project';
import Home from './components/Home';
import Browse from './components/Browse';
import Search from './components/Search';
import Front from './components/Front';
import AppNavbar from './components/AppNavbar';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Container} from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
        <Router>
        <div className="app">
          <AppNavbar/>
          <UnPrivateRoute exact path="/" component={Front}/>
          <UnPrivateRoute path="/register" component={Register}/>
          <UnPrivateRoute path="/login" component={Login}/>
          <PrivateRoute path="/user/:username/profile" component={Profile}/>
          <PrivateRoute path="/user/:username/projects/:project" component={Project} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute path="/home/browse" component={Browse} />
          <PrivateRoute path="/search/:term" component={Search}/>
        </div>
        </Router>
    </Provider>
  );
}

export default App;
