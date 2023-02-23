import './App.css';

import { Header } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import BeerList from './BeerList';
import Navbar from './Navbar';
import BeerStyles from './BeerStyles';
import Home from './Home';
import Beer from './Beer'
import Login from './Login';

import { Container, Button, Menu } from 'semantic-ui-react'
import Breweries from './Breweries';
import Reviews from './Reviews';

import SignUp from './SignUp';


function App() {
  const [page, setPage] = useState('/beers')
  const [options, setOptions] = useState([])
  const [special, setSpecial] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:4000${page}`)
      .then((r) => r.json())
      .then((data) => handlingTest(data))
  }, [page, ])

  const handlingTest = (data) => {
    setOptions(data)
  }


  const handlePage = (newPage) => {
    setPage(newPage)
  }

  const handleClick = (item) => {
    console.log(item)
    setSpecial(item)
  }

  const test = (item) => {
    console.log(item)
  }

  const confirmUser = (item) => {
    setUser(item)
  }

  const logOut = (item) => {
    setUser(item)

  }


  return (
    <div className="App">
      {/* <List bulleted>
          {options.map((item) => Object.values(item).map((value) => 
          <List.Item key={value}>{value}</List.Item>
          ))}

        </List> */}
      <BrowserRouter>
        <header className='headertest'>
          <Header as='h1' color='orange'>Beer List</Header>
          <Navbar handlePage={handlePage} user={user} logOut={logOut}/>
        </header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <SignUp confirmUser={confirmUser}/>
            </Route>
            <Route exact path="/login">
              <Login onLogin={confirmUser} user={user} logOut={logOut}/>
            </Route>
            <Route exact path="/beers">
              <BeerList options={options} handleClick={handleClick} user={user} />
            </Route>
            <Route exact path='/beers/:id'>
              <Beer special={special}/>
            </Route>
            <Route exact path="/breweries">
              <Breweries options={options}/>
            </Route>
            <Route exact path="/beerstyles">
              <BeerStyles options={options}/>
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
