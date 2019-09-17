import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormFields';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';
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

  resetFormSuccess(type) {
    const newFormData = { ...this.state.formData };

    for(let key in newFormData){
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }

    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type ?  'Congratulations' : 'Already on the database'
    });
    this.successMessage();
  }

  successMessage() {
    setTimeout(() => {
      this.setState({
        formSuccess: ''
      })
    }, 2000);
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
      const snapshot  = await firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
      if (snapshot.val() === null) {
        firebasePromotions.push(dataToSubmit);
        this.resetFormSuccess(true);
      } else {
        this.resetFormSuccess(false);
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
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={(event) => this.onSubmitForm(event)}>Enroll</button>
              <div className="enroll_discl">
                Sit Lorem excepteur non pariatur ea tempor fugiat in exercitation cillum tempor est.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;