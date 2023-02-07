import './App.css';

import { Header } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Beer from './Beer';

function App() {
  const [page, setPage] = useState('beers')
  const [options, setOptions] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4000/${page}`)
      .then((r) => r.json())
      .then((data) => handlingTest(data))
  }, [page])

  const handlingTest = (data) => {
    setOptions(data)
  }


  return (
    <div className="App">
      <header className="App-header">
      <Header as='h1' color='orange'>Beer List</Header>
        <List bulleted>
          {options.map((item) => 
          <List.Item key={item.id}>{item.name}</List.Item>
          )}

        </List>

      </header>
      <BrowserRouter>
          <Switch>
             <Route exact path="/beers">
              <Beer />
            </Route>
        
            </Switch>
         </BrowserRouter>
    </div>
  );
}

export default App;
