import React, { Component } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import { firebasePlayers, firebase, firebaseDB } from '../../../firebase';
import FormField from '../../ui/FormFields';
import { validate } from '../../ui/misc';
import FileUploader from '../../ui/FileUploader';

class AddEditPlayer extends Component {
  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'name_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last Name',
          name: 'lastname_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player number',
          name: 'number_input',
          type: 'text'
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  }

  async componentDidMount() {
    const playerId = this.props.match.params.id;
    
    if (!playerId) {
      this.setState({
        formType: 'Add Player'
      })
    } else {
      try {
        const snapshot = await firebaseDB.ref(`players/${playerId}`).once('value');
        const player = snapshot.val();
        player['id'] = playerId;
        try {
          const url = await firebase.storage().ref('players').child(player.image).getDownloadURL();        
          this.updateFields(player, 'Edit Player', url);
        } catch (error) {
          this.updateFields(player, 'Edit Player'); 
        }
        
      } catch (error) {
        
      }
    }
  }

  updateFields(player, type, defaultImg) {
    const newFormData = {
      ...this.state.formData
    }
    
    for(let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }

    this.setState({
      playerId: player.id,
      defaultImg,
      formType: type,
      formData: newFormData,
    })

  }

  successForm(message) {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  }

  onChange = (element, content = '') => {
    const newFormData = { ...this.state.formData };
    
    if (content === '') {
      newFormData[element.id].value = element.event.target.value;
    } else {
      newFormData[element.id].value = content;
    }
    
    let validData = validate(newFormData[element.id]);

    newFormData[element.id].valid = validData[0];
    newFormData[element.id].validationMessage = validData[1];

    this.setState({
      formError: false,
      formData: newFormData
    })
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
        if (this.state.formType === 'Edit Player') {
          await firebaseDB.ref(`players/${this.state.playerId}`).update(dataToSubmit);
          this.successForm('Updated correctly');
        } else {
          await firebasePlayers.push(dataToSubmit);
          this.props.history.push('/admin/players');
        }
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

  resetImage = () => {
    const newFormData = {...this.state.formData};
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData
    })

  }

  storeFilename= (filename) => {
    this.onChange({ id: 'image' }, filename)
  }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>
            {this.state.formType}
          </h2>
          <div>
            <form onSubmit={this.onSubmitForm}>
              <FileUploader 
                dir="players"
                tag={'Player image'}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={this.resetImage}
                filename={this.storeFilename}
              />
              <FormField
                id={'name'}
                formData={this.state.formData.name}
                change={this.onChange}
              />
              <FormField
                id={'lastname'}
                formData={this.state.formData.lastname}
                change={this.onChange}
              />
              <FormField
                id={'number'}
                formData={this.state.formData.number}
                change={this.onChange}
              />
               <FormField
                id={'position'}
                formData={this.state.formData.position}
                change={this.onChange}
              />
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
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;