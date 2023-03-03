import React, { useState } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';
import MyPage from "./MyPage";

function Login({ onLogin, user, logOut }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, passwordConfirmation }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
  <Grid textAlign='center' verticalAlign='middle' className='test'>
    {user ?  <MyPage logOut={logOut} /> :
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='white' textAlign='center'>
        {/* <Image src='/logo.png' />  */}
        Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleSubmit} >
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' id="username" value={username}
onChange={(e) => setUsername(e.target.value)}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            id="password"
            value={password}
onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            id="password_confirmation"
            value={passwordConfirmation}
onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          
          <Button color='white' fluid size='large'>
            Login

          </Button>
          
        </Segment>
      </Form>
      <Message>
      <Link to={`/signup`} style={{ color: 'white' }}><Button
     inverted color='white'>Sign Up</Button></Link>
        {/* New to us? <a href='#'>Sign Up</a> */}
      </Message>
    </Grid.Column>
    }
  </Grid>
  )
}

export default Login
