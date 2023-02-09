import './App.css';

import { Header } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Beer from './Beer';
import Navbar from './Navbar';
import BeerStyles from './BeerStyles';

import { Container } from 'semantic-ui-react'

function App() {
  const [page, setPage] = useState('/beers')
  const [options, setOptions] = useState([])


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


  return (
    <div className="App">
      {/* <List bulleted>
          {options.map((item) => Object.values(item).map((value) => 
          <List.Item key={value}>{value}</List.Item>
          ))}

        </List> */}
      <BrowserRouter>
        <header className='header'>
          <Header as='h1' color='orange'>Beer List</Header>
          <Navbar handlePage={handlePage}/>
        </header>
          <Switch>
            <Route exact path="/beers">
              <Beer options={options}/>
            </Route>
            <Route exact path="/beerstyles">
              <BeerStyles options={options}/>
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
