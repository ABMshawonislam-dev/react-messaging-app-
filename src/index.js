import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';

const Root = ()=>(
  <Router>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Switch>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
