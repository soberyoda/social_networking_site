import React, { Component } from 'react';
import './App.css';
import './Registration.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  componentDidMount() {
    this.setState({ showForm: true });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.registerUser(event.target.username.value, event.target.password.value);
  };
  
  registerUser(username, password) {
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(function(response) {
      if (response.status === 200) {
        console.log("user registered");
      }
    })
    .catch(function(error) {
      console.error("Error registering user:", error);
    });
  }

  render() {
    const { showForm } = this.state;
  
    return (
      <div className={`Register ${showForm ? 'show' : ''}`}>
        <CSSTransition in={showForm} timeout={500} classNames="fade" unmountOnExit>
          {(state) => (
            <Form
              ref={(node) => (this.formNode = node)}
              className={`RegisterForm fade-${state}`}
              onSubmit={this.handleSubmit}>
              <Form.Group controlId='username' size='lg'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  type ='username'
                  name='username'
                />
              </Form.Group>
              <Form.Group controlId='password' size='lg'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password' 
                />
              </Form.Group>
  
              <div className='CenterButton'>
                <Button
                  block="true"
                  size="lg"
                  type="submit"
                  className="CustomButton"
                  ref={(button) => (this.submitButton = button)} 
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </CSSTransition>
      </div>
    );
  }
}

export default Registration;
