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

import { Container } from 'semantic-ui-react'
import Breweries from './Breweries';
import Reviews from './Reviews';


function App() {
  const [page, setPage] = useState('/beers')
  const [options, setOptions] = useState([])
  const [special, setSpecial] = useState([])


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
          <Navbar handlePage={handlePage}/>
        </header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/beers">
              <BeerList options={options} handleClick={handleClick}/>
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
