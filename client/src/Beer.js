import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

function Beer({user}) {
  
  const { beers } = useSelector((state) => state.brew)

  let { id } = useParams();
  const [selected] = useState(beers[id - 1])

  const history = useHistory();

  function handleAdd() {
    history.push(`/beers/${id}/add`);
  }

  return (
    
    <Grid className='test'>
    <Grid.Row columns='equal'>
   {selected ?
      <Grid.Column floated='left'>

        <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
          <Card >
            <div className='test2'>
            <h1>{selected.name.toUpperCase()}</h1>
            <h2>{selected.style} </h2>
            <h3>{selected.brewery.toUpperCase()} BREWING</h3>
            <h4>ABV: {selected.abv}</h4>
            </div>
          </Card>
          <Card>
            <div className='test2'>
              <h1>Reviews</h1>
            </div>
          </Card>
            {selected.reviews.length > 0 ? selected.reviews.map((item) => 
              <Card>
                <div className='test2' key={item.id}>
                  <h3>{item.rating}/5</h3>
                  <h3>{item.review}</h3>
                </div> 
          </Card> )
          : ''}
          {user ? <Card>
            <Button 
              color='black'
              onClick={handleAdd}
              >Add A Review
            </Button>
            </Card>
            : '' }
          </Card.Group>
            <Link to={`/beers`} style={{ color: 'white' }}>
              <Button
                color='black'
                >Return to Beer List
              </Button>
            </Link>
        </Grid.Column> :  history.push(`/beers`) }

      <Grid.Column floated='right'>
        <img 
          className='beers' 
          src='https://images.pexels.com/photos/1267700/pexels-photo-1267700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' 
          alt='beers'
        />
      </Grid.Column>
    </Grid.Row>
    </Grid> 
  )
}

export default Beer;