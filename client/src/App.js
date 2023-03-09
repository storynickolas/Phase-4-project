import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import BeerList from './BeerList';
import Navbar from './Navbar';
import BeerStyle from './BeerStyle';
import Style from './Style';


import Home from './Home';
import Beer from './Beer'
import Login from './Login';
import { useDispatch } from "react-redux";
import { fetchBrews } from "./Redux/brews"
import { fetchTypes } from "./Redux/type"


import { useHistory } from 'react-router-dom'

import SignUp from './SignUp';
import MyPage from './MyPage';


function App() {
  const [user, setUser] = useState(null);


  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrews());
    dispatch(fetchTypes());
  }, [dispatch]);

  const confirmUser = (item) => {
    setUser(item)
    history.push(`/mypage`);
  }

  const logOut = (item) => {
    setUser(item)
    history.push(`/`);
  }


  return (
    <div className="App">
        <header className='headertest'>
          <h1 color='white'>BEER RATING</h1>
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
              <BeerList />
            </Route>
            <Route exact path='/beers/:id'>
              <Beer user={user} />
            </Route>
            <Route exact path="/beerstyles">
              <BeerStyle />
            </Route>
            <Route exact path='/beerstyles/:id'>
              <Style />
            </Route>
            <Route exact path='/mypage'>
              <MyPage logOut={logOut} user={user} />
            </Route>
          </Switch>
    </div>
  );
}

export default App;
