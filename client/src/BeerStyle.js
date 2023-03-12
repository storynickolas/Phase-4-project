import React from 'react';
import { Card, Grid } from 'semantic-ui-react'
import { v4 as uuid } from "uuid";
import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

function BeerStyle() {
  const { type } = useSelector((state) => state.type)

  const history = useHistory();

  function handleTest(item) {
    history.push(`/beerstyles/${type.indexOf(item) + 1}`);
  }

  return (
      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='left'>
          <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
            {type.map((item) => 
              <Card key={uuid()}>
                <div className='test2'>
                <button className='test3' onClick={() => handleTest(item, type)}>
                    <h3>{item.style.toUpperCase()}</h3>
                  </button>
                </div>
              </Card>)}
          </Card.Group>
          </Grid.Column>
          <Grid.Column floated='right'>
              <img className='beers' 
                src='https://images.pexels.com/photos/1267700/pexels-photo-1267700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
                alt='beers'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>



    
)

}

export default BeerStyle;
