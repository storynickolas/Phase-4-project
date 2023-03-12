import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from "uuid";

import { useHistory } from 'react-router-dom'

function MyPage({ logOut, user }) {
  const [t, setT] = useState()

  const history = useHistory();

  let { beers } = useSelector((state) => state.brew);

    useEffect(() => {
      let myBeers = [...beers]
      myBeers = myBeers.filter(d => d.reviews !== [])
      myBeers = myBeers.filter(d => d.reviews.some(f => f.user_id === user.id))
      setT(myBeers)
    }, [beers, user])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logOut(null);
      }
    });
    history.push(`/login`);
  }

  function handleEdit(e, tool) {
    e.preventDefault()
    history.push(`/review/${tool.id}/edit`);
  }

  return (
      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='center'>
          <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
          <Card>
            <div className='test2'>
              <h1>MY BEERS</h1>
              <Button 
                inverted 
                color='white' 
                onClick={() => handleLogoutClick()}>
                  Log Out
              </Button> 
            </div>
          </Card>
          { t ?
            t.map((item) => 
              <Card key={uuid()}>
              <div className='test2'>
                <h2>{item.name.toUpperCase()}</h2>
                {item.reviews.map((tool) => 
                tool.user_id === user.id ?
                <div>
                <h2>{tool.rating}/5</h2>
                <h3>{tool.review}</h3>
                <Button inverted color='white' onClick={(e) => handleEdit(e, tool)}>Edit/Remove</Button> 
                </div> : '')}
              </div>
            </Card>) : ''}
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

export default MyPage;