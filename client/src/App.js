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
import { useSelector, useDispatch } from "react-redux";
import { fetchBrews } from "./Redux/brews"
import { fetchTypes } from "./Redux/type"


import { useHistory } from 'react-router-dom'



import { Container, Button, Menu } from 'semantic-ui-react'


import SignUp from './SignUp';
import MyPage from './MyPage';


function App() {
  const [special, setSpecial] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null);

  const [selected, setSelected] = useState();

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrews());
    dispatch(fetchTypes());
  }, [dispatch]);


  const handleClick = (item) => {
    console.log(item)
    setSpecial(item)
  }

  const confirmUser = (item) => {
    setUser(item)
    history.push(`/mypage`);
  }

  const logOut = (item) => {
    setUser(item)
    history.push(`/`);
  }
  const handleEdit = (item) => {
    console.log(item)
    history.push(`/reviews/${item.id}/edit`);
    setSelected(item)
  }


  return (
    <div className="App">

        <header className='headertest'>
          <h1 color='white'>Beer List</h1>
          <Navbar user={user} logOut={logOut}/>
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
              <BeerList handleClick={handleClick} user={user} />
            </Route>
            <Route exact path='/beers/:id'>
              <Beer special={special} user={user} />
            </Route>
            <Route exact path="/beerstyles">
              <BeerStyle handleClick={handleClick}/>
            </Route>
            <Route exact path='/beerstyles/:id'>
              <Style special={special} handleClick={handleClick}/>
            </Route>
            <Route exact path='/mypage'>
              <MyPage logOut={logOut} user={user} handleEdit={handleEdit}/>
            </Route>
          </Switch>
          


    </div>

  );
}

export default App;
