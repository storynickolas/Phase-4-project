
import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'


function Navbar({ user, logOut }) {

  return (
    <div>
      <Link to={`/`} style={{ color: 'white' }}>
      <Button 
     
      inverted color='white'
      >Home</Button></Link>
      <Link to={`/beers`} style={{ color: 'white' }}>
      <Button 

      inverted color='white'
      >Beers</Button></Link>
       <Link to={`/beerstyles`} style={{ color: 'white' }}>
     <Button 

      inverted color='white'
      >Beers Styles</Button></Link>
     {user ?
     <Link to={`/login`} style={{ color: 'white' }}><Button
     inverted color='white'>My Beers</Button></Link>
     :
     <Link to={`/login`} style={{ color: 'white' }}><Button
     inverted color='white'>Log In</Button></Link>
     }
    </div>
  );
}

export default Navbar;