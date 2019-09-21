import React, { Component } from 'react';
import { firebase } from '../../firebase';
import ReactFileUplader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileUrl: ''
  }

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return state = {
        name: props.defaultImgName,
        fileUrl: props.defaultImg
      }
    }

    return null;
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true });
  }

  handleUploadError = () => {
    this.setState({
      isUploading: false
    });
  }

  handleUploadSuccess = async (filename) => {
    this.setState({
      name: filename,
      isUploading: false
    });

    const url = await firebase.storage().ref(this.props.dir)
      .child(filename).getDownloadURL();

    this.setState({
      fileUrl: url
    });

    this.props.filename(filename);
  }

  uploadAgain = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileUrl: ''
    });

    this.props.resetImage();
  }

  render() {
    return (
      <div>
        { !this.state.fileUrl ?
            <div>
              <div className="label_input">{this.props.tag}</div>
              <ReactFileUplader 
                accept="image/*"
                name="image"
                randomizeFilename
                storageRef={firebase.storage().ref(this.props.dir)}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess} 
              />
            </div>
          : null
        }
        {
          this.state.isUploading ?
            <div className="progress" style={{ textAlign: 'center', margin: '30px 0' }}>
              <CircularProgress 
                style={{ color: '#98c6e9' }}
                thickness={7}
              />
            </div>
          : null
        }
        {
          this.state.fileUrl ?
            <div className="image_upload_container">
              <img 
                style={{
                  width: '100%'
                }}
                src={this.state.fileUrl}
                alt={this.state.name}
              />
              <div className="remove" onClick={this.uploadAgain}>
                Remove
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default FileUploader;