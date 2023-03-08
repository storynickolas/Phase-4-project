import React from 'react';
import { Header } from 'semantic-ui-react'
import { Card, Grid, Image } from 'semantic-ui-react'
import { v4 as uuid } from "uuid";
import { useSelector } from 'react-redux'


function BeerList({ handleClick }) {
  const { beers } = useSelector((state) => state.brew)

  return (
    
      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='left'>
            <Header as='h1' color='orange'>Beers</Header>
            <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
              {beers.map((item) => 
                <Card key={uuid()}>
                  <div className='test2'>
                    <button className='test7' onClick={() => handleClick(item)}>
                        <h3>{item.name}</h3>
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

