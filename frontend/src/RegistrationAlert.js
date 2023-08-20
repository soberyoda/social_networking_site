import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import './Registration.css'
import './App.css'
class RegistrationAlert extends Component {
    render() {
        const { visible, heading, message } = this.props;

        if (visible) {
            return (
                <div className="RegistrationAlert">
                      <Alert variant="custom" onClose={this.props.onClose} dismissible className="alert-custom">
                        <Alert.Heading>{heading}</Alert.Heading>
                        <p>{message}</p>
                    </Alert>
                </div>
            );
        }

        return null;
    }
}

export default RegistrationAlert;
