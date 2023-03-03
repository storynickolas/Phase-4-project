import React from 'react';
import { Header } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'

function MyPage({ logOut }) {


  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logOut(null);
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

              <Card>
                <div className='test2'>
                </div>
              </Card>
          </Card.Group>

           
          </Grid.Column>
          <Grid.Column floated='right'>
     <img className='beers' src='https://images.pexels.com/photos/1267700/pexels-photo-1267700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='beers'/>

          </Grid.Column>
        </Grid.Row>
      </Grid>


        




    
  )

}

export default MyPage;