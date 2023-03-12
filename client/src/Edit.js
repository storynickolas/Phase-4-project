import React from 'react';
import { useState } from 'react';
import { Card, Grid, Button, Rating } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { remove } from './Redux/brews'
import { revise } from './Redux/brews'

import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { useHistory } from 'react-router-dom'

function Edit({ user }) {

  const [newName, setNewName] = useState('')
  const [rate, setRate] = useState()

  const history = useHistory();

  let { id } = useParams();
  id = parseInt(id)


  const dispatch = useDispatch();

  const { beers } = useSelector((state) => state.brew);
  const r = beers.filter(d => d.reviews.length > 0);

  const t = r.filter(d => d.reviews.some(f => f.user_id === user.id));

  let selected = t.filter(d => d.reviews.some(f => f.id === id));
  selected = selected[0]
  let myreview = selected.reviews
  myreview = selected.reviews.filter(d => d.id === id)
  myreview = myreview[0]

  function handleName(e) {
    e.preventDefault();
    setNewName(e.target.value)
  }

  function handleRating(e, rating) {
    e.preventDefault()
    setRate(rating.rating)
  }

  function handleSubmit() {
    fetch(`http://localhost:4000/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        rating: rate,
        review: newName
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(revise(response));
        history.push(`/mypage`);
      })
  }        

  function handleDelete(myreview) {
    fetch(`http://localhost:4000/reviews/${myreview.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        dispatch(remove(myreview))
      }
    }).then(
      history.push(`/mypage`)
    );
  }

  
  return (
  
      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='center'>
          <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
            <Card>
              <div className='test2'>
                <h1>MY BEERS</h1>
              </div>
            </Card>
            <Card key={selected.id}>
              <div className='test2'>
                <h3>{selected.name.toUpperCase()}</h3>
                <div>
                  <label>Review: </label>
                  <input defaultValue={myreview.review} onChange={handleName} />
                </div>
                <div>
                  <label>Rating: </label>
                  <Rating icon='star' defaultRating={myreview.rating} maxRating={5} onRate={(e, {rating}) => handleRating(e, {rating})} />
                </div>
                <Button inverted color='white' onClick={() => handleSubmit()}>Done</Button>
                <Button inverted color='white' onClick={() => handleDelete(myreview)}>Delete</Button> 
              </div>
            </Card>
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

export default Edit;