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

const listingsUrl = "http://localhost:9000/listings"
const loginUrl = "http://localhost:9000/login"
const usersUrl = "http://localhost:9000/users"
const profileUrl = "http://localhost:9000/profile"

class App extends Component{
  
  state = initialState
  
  componentDidMount(){
    this.authorizeUser()
    fetch(listingsUrl, {
      method: 'GET',
      headers:{
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(response => response.json())
    .then(listings => this.setState({listings: listings}))
  }

  authorizeUser = () => {
    fetch(profileUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(response => response.json())
    .then(loggedInUser => {
      const { user } = loggedInUser
      this.setState({user})
    })
  }


  createListing = (newListing) => {
    this.setState({
      listings: [...this.state.listings, newListing]
    })
  }

  loginUser = (user) => {
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(response => {
      if(response.error){
        this.setState({alerts: [response.error]})
      } else {
        localStorage.setItem('token', response.token)
          this.setState({
            user: response.user,
            alerts: ["Successful Login!"],
            listings: response.user.listings
          })
      }
    })
  }

  signUp = (user) => {
    return fetch(usersUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: [response.errors]})
      }
      else{
        this.setState({
          alerts: ["User successsfully created! Please Log in"]
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
            submitAction={this.createListing}
            listings={this.state.listings}
            />
            {/* <Form submitAction={this.createListing}/>
            <TradeListings listings={this.state.listings}/> */}
          <Route 
            exact 
            path='/signup'
            render={(routerProps) => {
              return <SignUpForm {...routerProps} 
                        signUp={this.signUp}
                        loginUser={this.loginUser}
                        alerts={this.state.alerts}
                      />
            }}
          />
          <Redirect to='/' />
        </Switch>
  
      </Router>
    );
  }
}

export default App;
