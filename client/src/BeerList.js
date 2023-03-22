import React, { useEffect, useState } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react'
import { v4 as uuid } from "uuid";
import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'



function BeerList() {
  const { beers } = useSelector((state) => state.brew)
  const [highRated, setHighRated] = useState('')
  const [clicked, setClicked] = useState(false)

  const history = useHistory();

  function handleClick() {
    setClicked(!clicked)
  }


  useEffect(() => {
    fetch(`http://localhost:4000/beers/high`)
    .then((response) => response.json())
    .then((data) => setHighRated(data));
  }, []);

  return (
      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='left'>
            <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
              <Card>
                <Button  onClick={() =>  history.push(`/beers/add`)}>
                  <h1>Add A Beer</h1>
                </Button>
              </Card>
              <Card>
                <Button  onClick={() =>  handleClick()}>
                  {clicked ? <h1>Return to All</h1> : <h1>Highly Rated</h1>}
                </Button>
              </Card>
              {clicked ? 
              highRated.map((item) => 
              <Card key={uuid()}>
                <div className='test2'>
                  <button className='test3' onClick={() => history.push(`/beers/${item.id}`)}>
                      <h3>{item.name.toUpperCase()}</h3>
                  </button>
                </div>
                </Card>)
              :
              beers.map((item) => 
                <Card key={uuid()}>
                  <div className='test2'>
                    <button className='test3' onClick={() => history.push(`/beers/${item.id}`)}>
                        <h3>{item.name.toUpperCase()}</h3>
                    </button>
                  </div>
                </Card>)}
            </Card.Group>
          </Grid.Column>
          <Grid.Column floated='right'>
            <img className='beers' 
              src='https://images.pexels.com/photos/1267700/pexels-photo-1267700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
              alt='beers'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

export default BeerList;

