import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormFields';
import { validate } from '../../ui/misc';
class Enroll extends Component {
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
      }
    }
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid;
    }

    if (formIsValid) {
      
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
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={this.onSubmitForm}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              <FormField
                id={'email'}
                formData={this.state.formData.email}
                change={this.onChange}
              />
              { this.state.formError ? 
                  <div className="error_label">Something is wrong, try again </div>
                : null
              }
              <button onClick={(event) => this.onSubmitForm(event)}>Enroll</button>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;