import React, { useState } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Rating } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import { add } from './Redux/brews'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

function Review({user}) {
  const [newName, setNewName] = useState('')
  

  const [rate, setRate] = useState(3)

  const { beers } = useSelector((state) => state.brew)

  let { id } = useParams();
  
  const [selected] = useState(beers[id - 1])

  const dispatch = useDispatch();
  const history = useHistory();


  function handleName(e) {
    let name = e.target.value
    setNewName(name)
  }

  function handleRating(e, data) {
    e.preventDefault()
    let rating = data.rating
    setRate(rating)
  }

  function handleSubmit(e) {
    e.preventDefault();
    let formData = {
      id,
      user_id: user.id,
      beer_id: selected.id,
      rating: rate,
      review: newName
    }
    fetch("http://localhost:4000/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((r) => {
        dispatch(add(r));
        history.push(`/beers/${id}`);
      });
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
            {user ?
            <Card>
              <div className='test2'>
              <h4>Your Review</h4>
              <div>
                <label>Review: </label>
                <div className='test9'>
                  <input defaultValue={'Add a Review'} onChange={handleName}/> 
                </div>
              </div>
              <div>
                <label>Rating: </label>
                <div className='test9'>
                  <Rating icon='star' defaultRating={3} maxRating={5} onRate={handleRating} />
                </div>
              </div>
                <Button 
                color='black'
                onClick={handleSubmit}
                >Add Review
                </Button>
                </div>
            </Card> : ''}
          </Card.Group>
            <Link to={`/beers`} style={{ color: 'white' }}>
              <Button
                color='black'
                >Return to Beer List
              </Button>
            </Link>
        </Grid.Column> : history.push(`/beers/${id}`)}
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

export default Review;