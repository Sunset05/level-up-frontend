import { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Header from "./components/Header";
import TradeListings from "./pages/TradeListings"
import SignUpForm from "./components/SignUpForm";
import Profile from "./pages/Profile"
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Messages from "./components/Messages";

const initialState = {
  listings: [],
  user: {},
  alerts: [],
  directMessages: []
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
      method: "GET",
      headers:{
        "Authorization": `Bearer ${ localStorage.token }`
      }
    })
    .then(response => response.json())
    .then(listings => this.setState({ listings })) 
  }

  authorizeUser = () => {
    fetch(profileUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ localStorage.token }`
      }
    })
    .then(response => response.json())
    .then(loggedInUser => {
      const { user } = loggedInUser
      return user ? this.setState({ user }) : null
    })
  }


  loginUser = (user) => {
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
    .then(response => response.json())
    .then(response => {
      if(response.error){
        this.setState({alerts: [response.error]})
      } else {
        localStorage.setItem("token", response.token)
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
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

  addNewMessageToState = (newMessage) => {
    const updateUserState = this.state.user
    updateUserState.sent_messages = [...updateUserState.sent_messages, newMessage]
    this.setState({ updateUserState })
  }
  
  addNewDirectMessage = (userToMessage) => {
    console.log(userToMessage)
  }

  render() {
    return (
      <div className="app-container">
        <Router>
          <Header user={ this.state.user }/> 
          <div className="main-page-display">
            <Switch>

              <PrivateRoute 
                exact 
                path="/profile"
                component={ Profile }
                submitAction={ this.createListing }
                user={ this.state.user }
              />

              <Route 
                exact 
                path="/signup"
                render={ (routerProps) => {
                  return <SignUpForm { ...routerProps } 
                    signUp={ this.signUp }
                    loginUser={ this.loginUser }
                    alerts={ this.state.alerts }
                    user={ this.state.user }
                    removeUserFromState={ this.removeUserFromState }
                  />
                }}
              />

              <Route path="/profile/new">
                <Form user={ this.state.user.username } />
              </Route>

              <Route 
                exact 
                path="/profile/messages"
                render={(routerProps) => {
                  return <Messages 
                    user={ this.state.user } 
                    addNewMessage={ this.addNewMessageToState } 
                    { ...routerProps }
                  />
                }}
              />

              <Route 
                path="/profile/messages/:author"
                render={ (routerProps) => {
                  return <Messages 
                    user={ this.state.user } 
                    addNewMessage={ this.addNewMessageToState } 
                    { ...routerProps }
                  />
                }}
              />

              <Route exact path="/trade/">
              <TradeListings 
                listings={ this.state.listings } 
                userId={ this.state.user.id }
              />

              </Route>
              <Redirect to="/profile" />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
