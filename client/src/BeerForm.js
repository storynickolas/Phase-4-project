import React from 'react';
import { useState } from 'react';
import { Card, Grid, Button, Input, Dropdown } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { remove } from './Redux/brews'
import { revise } from './Redux/brews'

import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { useHistory } from 'react-router-dom'

function BeerForm({ user }) {

  const [newName, setNewName] = useState('')
  const [newStyle, setNewStyle] = useState('')
  const [brewery, setBrewery] = useState('')
  const [abv, setAbv] = useState('')
  const [status, setStatus] = useState(['Enter Data'])


  const history = useHistory();


  const dispatch = useDispatch();

  const { beers } = useSelector((state) => state.brew);

  const [newid, setNewid] = useState(beers.length)

  const { type } = useSelector((state) => state.type)
  
  let styles = []

  type.forEach((i) => {
    styles.push(
      { key:  i.style, value:  i.style, text: i.style }
      )
  })

  function handleName(e, name) {
    e.preventDefault();
    setNewName(e.target.value)
  }

  function handleStyle(e, style) {
    setNewStyle(style)
  }

  function handleBrewery(e, brewery) {
    setBrewery(brewery)
  }

  function handleABV(e, abv) {
    let newAbv = abv + '%'
    setAbv(newAbv)
  }

  function handleReset() {
    setStatus(['Enter Data'])
    history.go(0)
  }

  function handleSubmit() {
    let newBeer = {
      abv: abv,
      brewery: brewery,
      id: 11,
      name: newName,
      reviews: [],
      style: newStyle
    }
    setBrewery('')
    console.log(newBeer)
    fetch(`http://localhost:4000/beers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newBeer),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){
          setStatus(response.errors)
          console.log(response.errors)
        }
        else {
          setStatus(['Successfully Added'])
          console.log(response)
        }
        // dispatch(revise(response));
        // history.push(`/mypage`);
      })
  }        
  
  return (
  
      <Grid className='test'>
        <Grid.Row columns='equal'>
          <Grid.Column floated='center'>
          <Card.Group centered style={{margin: 50, color: 'red' }} itemsPerRow={1}>
            <Card>
              <div className='test2'>
                <h1>Add A Beer</h1>
              </div>
            </Card>
            <Card >
              <div className='test2'>
                <h3>Beer Name</h3>
                <Input 
                  placeholder='Name' 
                  onChange={(e, data) => handleName(e, data.value)}
                />
                <h3>Beer Style</h3>
                <div className='test9'>
                  <Dropdown
                    placeholder='Beer Type'
                    fluid
                    search
                    selection
                    options={styles}
                    onChange={(e, data) => handleStyle(e, data.value)}
                  />
   
                </div>
                <h3>ABV</h3>

                <Input
                  label={{ basic: true, content: '%' }}
                  labelPosition='right'
                  placeholder='abv'
                  onChange={(e, data) => handleABV(e, data.value)}
                />
        
            
                <h3>Brewery</h3>
                <Input 
                  placeholder='Name' 
                  onChange={(e, data) => handleBrewery(e, data.value)}
                />

                <br />
                <br />
                {status[0] !== 'Successfully Added' ? <Button inverted color='white' onClick={() => handleSubmit()}>Done</Button> : '' }
              </div>
            </Card>
            <Card>
            <div className='test2'>
              <h3>Status:</h3>
              {status[0] !== 'Successfully Added' ?
              <div>
                {status.map((item) => 
                <h5>{item}</h5>
                )}
              </div>
              :
              <div>
                {status.map((item) => 
                <h5>{item}</h5>
                )}
                <Button onClick={() => handleReset()}>Add Another</Button>
              </div>
              }
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

export default BeerForm;