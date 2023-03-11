import React, { useState } from "react";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
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
    {user ?  <MyPage logOut={logOut} user={user} /> :
    <Grid.Column style={{ maxWidth: 450 }}>
      <div className='test2'>
              <h1> Log-in to your account</h1>
              </div>
    

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
            placeholder='Password Confirmation'
            type='password'
            id="password_confirmation"
            value={passwordConfirmation}
onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button color='black' fluid size='large'>
            Login

          </Button>
          
        </Segment>
      </Form>
      <Message>
        <h3>Not a Member?</h3>
      <Link to={`/signup`} style={{ color: 'white' }}><Button
      color='black'>Sign Up</Button></Link>
        {/* New to us? <a href='#'>Sign Up</a> */}
      </Message>
    </Grid.Column>
    }
  </Grid>
  )
}

export default Login
