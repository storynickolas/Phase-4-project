import { Card, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom'

function Style() {

  const history = useHistory();


  const { beers } = useSelector((state) => state.brew)

  let { id } = useParams();
  const [selected] = useState(beers[id - 1])

  const result = beers.filter(beer => beer.style === selected.style);

  function handleTest(item) {
    history.push(`/beers/${item.id}`);
  }


  return (
    <Grid className='test'>
    <Grid.Row columns='equal'>
    {selected ?
      <Grid.Column floated='left'>
      
      <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
      <Card >
                <div className='test2'>
                <h1>{selected.style} Beers:</h1>
                </div>
        </Card>
        {result.length > 0 ? result.map((item) => 
                  <Card><div className='test2' key={item.id}>
                    <button className='test3' onClick={() => handleTest(item)}>
                        <h2>{item.name.toUpperCase()}</h2>
                        <h4>{item.brewery.toUpperCase()} BREWING</h4>
                        </button>
                  </div></Card>) : ''}
        </Card.Group>
        <Link to={`/beerstyles`} style={{ color: 'white' }}>
      <Button 
       color='black'
      >Return to Beer Styles</Button></Link>
      </Grid.Column>:  history.push(`/beerstyles`) }
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

export default Style;