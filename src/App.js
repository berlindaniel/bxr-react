import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MainPic from './Components/mainpic.js';
import HowItWorks from './Components/hiw.js';
import About from './Components/about.js';
import Footer from './Components/footer.js';
import Products from './Components/products.jsx';
import firebase from './index.js';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div>
          <header>
            <Link to="/"> <p class="header-index">bxr</p> </Link>
            <nav>
              <ul class="HeaderUl">
                <li class="HeaderLink"><p>
                <div class="dropdown"><a>Benefits</a><div class="dropdown-content">
                    <Link to="/">For Brands</Link>
                    <Link to="/">For Owners</Link>
                    <Link to="/">For Renters</Link>
                  </div>
                </div></p></li>
                <li class="HeaderLink"> <Link to="/about"> <p> About </p> </Link> </li>
                <li class="HeaderLink"> <Link to="/"> <p> How it Works </p> </Link> </li>
                <li class="HeaderLink"> <Link to="/signin"> <p> Sign In </p> </Link> </li>
              </ul>
            </nav>
          </header>
        </div>
        <Switch>
          <Route exact path="/" component={MainPic} />
        </Switch>
        <Switch>
          <Route exact path="/" component={HowItWorks} />
          <Route path="/about" component={About} />
          <Route path="/signin" component={Products} />
        </Switch>
        <Route component={Footer}></Route>
      </div>
      </Router>
    );
  }
}

export default App;
