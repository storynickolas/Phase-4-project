
import { Card, Segment, Divider, Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

function Style({handleClick, special}) {
  const [options, setOptions] = useState([])

  const { beers } = useSelector((state) => state.brew)

  console.log(special.style)
  console.log(beers[0].style)

  const result = beers.filter(beer => beer.style === special.style);
  
  console.log(result)


  return (
    <Grid className='test'>
    <Grid.Row columns='equal'>
      <Grid.Column floated='left'>
      <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
      <Card >
                <div className='test2'>
                <h1>{special.style}</h1>
                </div>
        </Card>
        <Card>
        <div className='test2'>
        <h3>Beers</h3>
          </div>
        </Card>
        {result.length > 0 ? result.map((item) => 
                  <Card><div className='test2' key={item.id}>
                    <button className='test7' onClick={() => handleClick(item)}><Link to={`/beers/${options.indexOf(item) + 1}`} style={{ color: 'white' }}><h3>{item.name}</h3></Link></button>
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