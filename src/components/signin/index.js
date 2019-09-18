import React, { Component } from 'react';
import { firebase } from '../../firebase';

import FormField from '../ui/FormFields';
import { validate } from '../ui/misc';

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  }

  onSubmitForm = async (event) => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid;
    }

    if (formIsValid) {
      try {
        await firebase.auth()
          .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password);
        this.props.history.push('/dashboard');
      } catch (error) {
        this.setState({
          formError: true
        })
      }
      
    } else {
      this.setState({
        formError: true
      })
    }
  }

  onChange = (element) => {
    const newFormData = { ...this.state.formData };
    newFormData[element.id].value = element.event.target.value;

    let validData = validate(newFormData[element.id]);

    newFormData[element.id].valid = validData[0];
    newFormData[element.id].validationMessage = validData[1];

    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{margin: '100px'}}>
          <form onSubmit={this.onSubmitForm}>
            <h2>Plase Login</h2>

            <FormField
              id={'email'}
              formData={this.state.formData.email}
              change={this.onChange}
            />
            <FormField
              id={'password'}
              formData={this.state.formData.password}
              change={this.onChange}
            />
            { this.state.formError ? 
                <div className="error_label">Something is wrong, try again </div>
              : null
            }
            <button onClick={(event) => this.onSubmitForm(event)}>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;