import React, { useState } from "react";
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

function SignUp({ confirmUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => confirmUser(user));
      }
    });
  }

  return (
    <Grid textAlign='center' verticalAlign='middle' className='test'>

    <Grid.Column style={{ maxWidth: 450 }}>
      <div className='test2'>
              <h1> Sign Up </h1>
              </div>
    <Form size='large' onSubmit={handleSubmit} >
        <Segment stacked>
        <Form.Input 
          fluid icon='user' 
          iconPosition='left' 
          placeholder='Username' 
          id="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
            placeholder='Password Confirmation'
            type='password'
            id="password_confirmation"
            value={passwordConfirmation}
onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button color='black' fluid size='large'>
            Sign Up

          </Button>
    </Segment>
      </Form>
    </Grid.Column>
    
  </Grid>
  );
}

export default SignUp;
