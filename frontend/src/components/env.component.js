import React, { Component } from "react";
import axios from 'axios';

import Dropzone from "react-dropzone";
import Home from "./home.component"
import authHeader from "../services/auth-header";

class Env extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        { name: '-vide-', id: 0 },
        { name: 'Data 360', id: 1 },
        { name: 'Plan Relance', id: 2 }
      ]
    };
  }
  render() {
    let optionTemplate = this.state.values.map(v => (
      <option value={v.id}>{v.name}</option>
    ));

    return (
    <div>
      <label>
        Choisissez le projet dans lequel envoyer les documents:
        <select value={this.state.value} onChange={this.handleChange}>
          {optionTemplate}
        </select>
      </label>
      <Home>
      </Home>
      </div>
    );
  }
}

export default Env;
