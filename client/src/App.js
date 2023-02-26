import './App.css';

import { Header } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import BeerList from './BeerList';
import Navbar from './Navbar';
import BeerStyle from './BeerStyle';
import Style from './Style';

import Home from './Home';
import Beer from './Beer'
import Login from './Login';


import { Container, Button, Menu } from 'semantic-ui-react'


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
          <h1 color='white'>Beer List</h1>
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
            <Route exact path="/beerstyles">
              <BeerStyle options={options} handleClick={handleClick}/>
            </Route>
            <Route exact path='/beerstyles/:id'>
              <Style special={special}/>
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
