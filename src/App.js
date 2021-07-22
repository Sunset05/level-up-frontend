import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
// import Form from './components/Form';
import { Component } from 'react';
// import TradeListings from './pages/TradeListings'
import SignUpForm from './components/SignUpForm';
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute';

const initialState = {
  listings: [],
  user: {},
  alerts: [],
}

class App extends Component{

  state = initialState

  createListing = (newListing) => {
    this.setState({
      listings: [...this.state.listings, newListing]
    })
  }

  signUp = (user) => {
    return fetch("http://localhost:9000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else{
        localStorage.setItem('token', response.token)
        this.setState({
          user: response.user,
          alerts: ["User successsfully created!"]
        })
      }
    })

  }
  
  render() {
    return (
      <Router>
        <Header />
        <h1>Welcome to my site</h1>

        <Switch>
          <PrivateRoute 
            exact 
            path="/"
            component={Home}
            submitAction={this.submitAction}
            listings={this.state.listings}
            />
            {/* <Form submitAction={this.createListing}/>
            <TradeListings listings={this.state.listings}/> */}
          <Route 
            exact 
            path='/signup'
            render={(routerProps) => {
              return <SignUpForm {...routerProps} signUp={this.signUp} alerts={this.state.alerts}/>
            }}
          />
          <Redirect to='/' />
        </Switch>
  
      </Router>
    );
  }
}

export default App;
