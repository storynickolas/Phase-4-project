import React from 'react';
import { Header } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import { Card, Grid, Button, Rating } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { v4 as uuid } from "uuid";
import { Link } from 'react-router-dom';

function MyPage({ logOut, user }) {
  const [myBeers, setMyBeers] = useState([])
  const [form, setForm] = useState(true)
  const [edit, setEdit] = useState(true)

  const [newName, setNewName] = useState('')
  const [rate, setRate] = useState()

  const [cow, setCow] = useState()


  const { beers } = useSelector((state) => state.brew)
  // const filtered = beers.filter(val => val.reviews.id === 1);
  const r = beers.filter(d => d.reviews.length > 0);

  // const t = r.find(d => d.reviews.filter(c => c.find(item => item.user_id === 13)));
  const t = r.filter(d => d.reviews.some(f => f.user_id === user.id));




  console.log(user) 
  console.log(t)
  console.log(r)
  console.log(r[0].reviews[2].user_id)

  console.log(user.id)



  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logOut(null);
      }
    });
  }

  function handleName(e) {
    e.preventDefault();
    // let newCity = e.target.value
    setNewName(e.target.value)
  }


  function handleRating(e, rating) {
    e.preventDefault()
    console.log(rating.rating)
    // let rating = data.rating
    setRate(rating.rating)
  }

  function handleClick() {
    // console.log(test)
  }

  function handleEdit(e, item) {
    e.preventDefault()
    setEdit(false)
    console.log(user)

    setCow(item)
    setNewName(item.reviews[0].review)
    setRate(item.reviews[0].rating)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEdit(true)
    console.log({
      rate: rate,
      reviw: newName
    })
    console.log(newName)
    // fetch(`/reviews/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ rating: newRating }),
    // })
    //   .then((r) => r.json())
    //   .then(console.log('test'));

  }

  function handleDelete(item) {
    const id = item.id
    // console.log(item.id)
    fetch(`http://localhost:4000/reviews/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        console.log('test');
      }
    });
  }

  return (
    

      <Grid >
        <Grid.Row columns='equal'>
          <Grid.Column floated='left'>

          <Header as='h1' color='orange'>My Page</Header>
          <Button inverted color='orange' onClick={() => handleLogoutClick()}>Log Out</Button> 
          <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
          {edit ?
            t.map((item) => 
              <Card key={uuid()}>
              <div className='test2'>
                <h3>{item.name}</h3>
                {item.reviews.map((tool) => 
                tool.user_id === user.id ?
                <div>
                <h3>{tool.rating}/5</h3>
                <h3>{tool.review}</h3>
                <button onClick={() => handleDelete(tool)}>Delete</button>
                <button onClick={() => handleEdit(item)}>Edit</button>
                </div> : '')}
              </div>
            </Card>)
            :
            <Card key={uuid()}>
              <div className='test2'>
                <h3>{cow.name}</h3>
                {/* <h3>{item.reviews[0].rating}/5</h3>
                <h3>{item.reviews[0].review}</h3> */}
                <div>
                  <label>Review: </label>
                  <input onChange={handleName} />
                </div>
                <div>
                  <label>Rating: </label>
                  <Rating icon='star' defaultRating={cow.reviews[0].rating} maxRating={5} onRate={(e, {rating}) => handleRating(e, {rating})} />
                </div>
                <button onClick={() => handleSubmit()}>Done</button>
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