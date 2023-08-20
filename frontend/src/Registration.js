import React, { Component } from 'react';
import './App.css';
import './Registration.css';
import { CSSTransition } from 'react-transition-group';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RegistrationAlert from './RegistrationAlert';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      registrationAlert: {
        variant: '',
        heading: '',
        message: '',
        visible: false,
      },
    };
  }

  componentDidMount() {
    this.setState({ showForm: true });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    try {
      const response = await this.registerUser(username.value, password.value);
      if (response.status === 200) {
        this.showRegistrationAlert("success", "User registered!", "You can now log in using your credentials");
      } else if(response.status === 422){
        this.showRegistrationAlert("error", "User Already Exists", "Please choose a different name.");
      }else{
        this.showRegistrationAlert("error", "User not registered",  "Something went wrong!");
      }
    }catch (error) {
      this.showRegistrationAlert("danger", "Error", "Something went wrong!");
    }
  };

  async registerUser(username, password) {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    return response;
  }

  showRegistrationAlert = (variant, heading, message) => {
    this.setState({
      registrationAlert: {
        variant: variant,
        heading: heading,
        message: message,
        visible: true,
      },
    });
  };

  render() {
    const { showForm, registrationAlert } = this.state;

    return (
      <>
        <div className='Register'>
        <RegistrationAlert {...registrationAlert} />
          <CSSTransition in={showForm} timeout={500} classNames="fade" unmountOnExit>
            {(state) => (
              <Form
                className={`RegisterForm fade-${state}`}
                onSubmit={this.handleSubmit}>
                <Form.Group controlId='username' size='lg'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    autoFocus
                    type='username'
                    name='username' />
                </Form.Group>
                <Form.Group controlId='password' size='lg'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password' />
                </Form.Group>

                <div className='CenterButton'>
                  <Button
                    block
                    size="lg"
                    type="submit"
                    className="CustomButton"
                  >
                    Register
                  </Button>
                </div>
              </Form>
            )}
          </CSSTransition>
          
        </div>
      </>
    );
  }
}

export default Registration;
