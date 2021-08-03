import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
// import Form from './components/Form';
import { Component } from 'react';
import TradeListings from './pages/TradeListings'
import SignUpForm from './components/SignUpForm';
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Form from './components/Form';
import Messages from './components/Messages';

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
    .then(listings => this.setState({listings})) 
    // this.setState({alerts: [...this.state.alerts, result.error ]}) 
    //   : this.setState({listings: result.listings})
    // )
    // .then(listings => this.setState({listings: listings}))
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
      return user ? this.setState({user}) : null
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

  removeUserFromState = () => {
    this.setState({
      user: {},
      listings: []
    })
  }
  
  render() {
    return (
      <div className="app-container">
        <Router>
          <Header user={this.state.user}/> 
          <div className="main-page-display">
            <Switch>
              <PrivateRoute 
                exact 
                path="/profile"
                component={Profile}
                submitAction={this.createListing}
                user={this.state.user}
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
                            user={this.state.user}
                            removeUserFromState={this.removeUserFromState}
                          />
                }}
              />
              <Route path='/profile/new'>
                  <Form user={this.state.user.username} />
              </Route>
              <Route path='/profile/messages'>
                  <Messages />
              </Route>
              <Route exact path='/trade/'>
                <TradeListings listings={this.state.listings} userId={this.state.user.id}/>
              </Route>
              <Redirect to='/profile' />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
