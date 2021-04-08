import React, { Component } from "react";

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

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Veuillez utiliser le cadre ci-dessous pour envoyer les fichiers de données</h3>
        </header>
        <Dropzone onDrop={this.onDrop} accept={"text/csv"}/>
      </div>
    );
  }
}
