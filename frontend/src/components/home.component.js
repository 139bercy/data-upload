import React, { Component } from "react";
import axios from 'axios';

import UserService from "../services/user.service";
import Dropzone from "../Dropzone";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  onDropAccepted = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      console.log(file.name);
      const formData = new FormData();
      formData.append(file);
      axios.post('http://localhost/upload', formData)
        .then(res => {
          console.log(res);
        }
      ).catch(err => console.log(err))
    })
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Veuillez utiliser le cadre ci-dessous pour envoyer les fichiers de données</h3>
        </header>
        <Dropzone onDropAccepted={this.onDropAccepted} accept={"text/csv"}/>
      </div>
    );
  }
}
