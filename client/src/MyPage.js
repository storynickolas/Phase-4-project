import React from 'react';
import { useState } from 'react';
import { Card, Grid, Button, Rating } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from "uuid";

import { useHistory } from 'react-router-dom'

function MyPage({ logOut, user }) {
  const [edit, setEdit] = useState(true)
  const [selected, setSelected] = useState()

  const [newName, setNewName] = useState('')
  const [rate, setRate] = useState()

  const [cow, setCow] = useState()

  const history = useHistory();


  const { beers } = useSelector((state) => state.brew);
  const r = beers.filter(d => d.reviews.length > 0);

  const t = r.filter(d => d.reviews.some(f => f.user_id === user.id));

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logOut(null);
      }
    });
    history.push(`/`);
  }

  function handleName(e) {
    e.preventDefault();
    setNewName(e.target.value)
  }


  function handleRating(e, rating) {
    e.preventDefault()
    setRate(rating.rating)
  }

  function handleEdit(e, item, tool) {
    e.preventDefault()
    setEdit(false)
    setSelected(tool)
    setCow(item)
  }


  function handleSubmit(e) {
    e.preventDefault()
    setEdit(true)
    fetch(`http://localhost:4000/reviews/${selected.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rate,
        review: newName
      }),
    })
      .then((r) => r.json())
      .then(console.log('Success'));

  }

  function handleDelete(item) {
    const id = item.id
    fetch(`http://localhost:4000/reviews/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        console.log('test');
      }
    });
  }

  return (
    

      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='center'>
          <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
          <Card>
              <div className='test2'>
                <h1>
                  MY BEERS
                </h1>
                <Button inverted color='white' onClick={() => handleLogoutClick()}>Log Out</Button> 
                
                </div>
                </Card>
          {edit ?
            t.map((item) => 
              <Card key={uuid()}>
              <div className='test2'>
                <h2>{item.name.toUpperCase()}</h2>
                {item.reviews.map((tool) => 
                tool.user_id === user.id ?
                <div>
                <h2>{tool.rating}/5</h2>
                <h3>{tool.review}</h3>
                <Button inverted color='white' onClick={() => handleDelete(tool)}>Delete</Button> 
                <Button inverted color='white' onClick={(e) => handleEdit(e, item, tool)}>Edit</Button> 
                </div> : '')}
              </div>
            </Card>)
            :
            <Card key={selected.id}>
              <div className='test2'>
                <h3>{cow.name}</h3>
                <div>
                  <label>Review: </label>
                  <input defaultValue={selected.review} onChange={handleName} />
                </div>
                <div>
                  <label>Rating: </label>
                  <Rating icon='star' defaultRating={selected.rating} maxRating={5} onRate={(e, {rating}) => handleRating(e, {rating})} />
                </div>
                <button onClick={(e) => handleSubmit(e)}>Done</button>
              </div>
            </Card>}
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