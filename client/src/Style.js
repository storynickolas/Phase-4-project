
import { Card, Segment, Divider, Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeSelected } from './Redux/selected'

import { useHistory } from 'react-router-dom'

function Style() {
  const dispatch = useDispatch()

  const history = useHistory();


  const { beers } = useSelector((state) => state.brew)
  const { selected } = useSelector((state) => state.selected)

  const result = beers.filter(beer => beer.style === selected.style);


  function handleTest(item) {
    history.push(`/beers/${item.id}`);
    dispatch(changeSelected(item))
  }


  return (
    <Grid className='test'>
    <Grid.Row columns='equal'>
      <Grid.Column floated='left'>
      <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
      <Card >
                <div className='test2'>
                <h1>{selected.style} Beers:</h1>
                </div>
        </Card>
        {result.length > 0 ? result.map((item) => 
                  <Card><div className='test2' key={item.id}>
                    <button className='test7' onClick={() => handleTest(item)}>
                        <h2>{item.name.toUpperCase()}</h2>
                        <h4>{item.brewery.toUpperCase()} BREWING</h4>
                        </button>
                  </div></Card>) : ''}
        </Card.Group>
        <Link to={`/beerstyles`} style={{ color: 'white' }}>
      <Button 
       color='black'
      >Return to Beer Styles</Button></Link>
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

export default Style;