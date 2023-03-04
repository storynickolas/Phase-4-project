import React, { useState } from 'react';
import { Card, Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Rating } from 'semantic-ui-react'

function Beer({special}) {
  const [newName, setNewName] = useState('')
  const [form, setForm] = useState(true)
  const [rate, setRate] = useState(3)

  const { beers } = useSelector((state) => state.brew)


  function handleName(e) {
    let newCity = e.target.value
    setNewName(newCity)
  }


  function handleRating(e, data) {
    let rating = data.rating
    setRate(rating)
  }



  function handleAdd() {
    setForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    let formData = {
      user_id: 1,
      beer_id: special.id,
      rating: rate,
      review: newName
    }
    fetch("http://localhost:4000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((review) => {
        setForm(true)
        console.log(review);
      });
  }

  function handleDelete(id) {
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
      <Grid.Column floated='left'>
        <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
          <Card >
            <div className='test2'>
            <h1>{special.name}</h1>
            <h2>Beer Style: {special.style}</h2>
            <h2>Brewery: {special.brewery}</h2>
            <h4>ABV: {special.abv}</h4>
            </div>
          </Card>
          <Card>
            <div className='test2'>
              <h3>Reviews</h3>
            </div>
          </Card>
            {special.reviews.length > 0 ? special.reviews.map((item) => 
              <Card>
                <div className='test2' key={item.id}>
                  <h3>{item.rating}/5</h3>
                  <h3>{item.review}</h3>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
          </Card>) : ''}
          {form ? <Card>
            <Button 
              color='black'
              onClick={handleAdd}
              >Add A Review
            </Button>
            </Card>
            : 
            <Card>
              <h4>Your Review</h4>
              <div>
                <label>Review: </label>
              <input defaultValue={'test'} onChange={handleName}/> 
              </div>
              <div>
                <label>Rating: </label>
                <Rating icon='star' defaultRating={3} maxRating={5} onRate={handleRating} />
              </div>
                <Button 
                color='black'
                onClick={handleSubmit}
                >Add Review
                </Button>
            </Card>}
          </Card.Group>
            <Link to={`/beers`} style={{ color: 'white' }}>
              <Button
                color='black'
                >Return to Beer List
              </Button>
            </Link>
        </Grid.Column>
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