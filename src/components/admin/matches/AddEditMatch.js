import React, { Component } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';

import FormField from '../../ui/FormFields';
import { validate } from '../../ui/misc';

class AddEditMatch extends Component {
  state = {
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'date_input',
          type: 'date'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'result_local_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a away team',
          name: 'select_away',
          type: 'select',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result away',
          name: 'result_away_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'referee_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'stadium_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team result',
          name: 'select_result',
          type: 'select',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' },
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played?',
          name: 'select_played',
          type: 'select',
          options: [
            { key: 'Yes', value: 'Yes' },
            { key: 'No', value: 'No' },
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
    }
  }

  onChange = (element) => {
    // const newFormData = { ...this.state.formData };
    // newFormData[element.id].value = element.event.target.value;

    // let validData = validate(newFormData[element.id]);

    // newFormData[element.id].valid = validData[0];
    // newFormData[element.id].validationMessage = validData[1];

    // this.setState({
    //   formError: false,
    //   formData: newFormData
    // })
  }

  onSubmitForm = (event) => {

  }

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>
            {this.state.fromType}
          </h2>
          <form onSubmit={this.onSubmitForm()}>
            <FormField
              id={'date'}
              formData={this.state.formData.date}
              change={this.onChange}
            />
            <div className="select_team_layout">
              <div className="label_input">Local</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={'local'}
                    formData={this.state.formData.local}
                    change={this.onChange}
                  />
                </div>
                <div>
                  <FormField
                    id={'resultLocal'}
                    formData={this.state.formData.resultLocal}
                    change={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="select_team_layout">
              <div className="label_input">Away</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={'away'}
                    formData={this.state.formData.away}
                    change={this.onChange}
                  />
                </div>
                <div>
                  <FormField
                    id={'resultAway'}
                    formData={this.state.formData.resultAway}
                    change={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="split_fields">
              <FormField
                id={'referee'}
                formData={this.state.formData.referee}
                change={this.onChange}
              />
               <FormField
                id={'stadium'}
                formData={this.state.formData.stadium}
                change={this.onChange}
              />
            </div>
            <div className="split_fields">
              <FormField
                id={'result'}
                formData={this.state.formData.result}
                change={this.onChange}
              />
              <FormField
                id={'final'}
                formData={this.state.formData.final}
                change={this.onChange}
              />
            </div>
            <div className="success_label">{this.state.formSuccess}</div>
            {
              this.state.formError ?
                <div className="error_label">
                  Something is wrong
                </div>
              :
                null
            }
            <div className="admin_submit">
              <button onClick={this.onSubmitForm}>
                {this.state.fromType}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditMatch;