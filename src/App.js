import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Form from './components/Form';
import { Component } from 'react';
import TradeListings from './pages/TradeListings'

const initialState = {
  listings: []
}

class App extends Component{

  state = initialState

  createListing = (newListing) => {
    this.setState({
      listings: [...this.state.listings, newListing]
    })
  }
  
  render() {
    return (
      <Router>
        <Header />
        <h1>Welcome to my site</h1>

        <Switch>
          <Route path="/">
            <Form submitAction={this.createListing}/>
            <TradeListings listings={this.state.listings}/>
          </Route>
        </Switch>
  
      </Router>
    );
  }
}

export default App;
