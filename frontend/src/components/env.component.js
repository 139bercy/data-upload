import React, { Component } from "react";

import Home from "./home.component"
import Environnement from "../services/environnement.service"

class Env extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      values : [],
      envValue : "-vide-",
      isLoaded : false
    };
  }
  
  componentDidMount() {
    Environnement.getAllEnv()
    .then(
      (response) => {
        console.log(response.data)
        this.setState({
          isLoaded: true,
          values: response.data
        });
      })
    .catch(
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  handleChange(e) {
    console.log(e.target.name)
    this.setState({ envValue: e.target.name });
  }

  render() {
    let optionTemplate = this.state.values.map(v => (
      <option values={v.name}>{v.name}</option>
    ));

    return (
      <div className="container">
      {this.state.envValue === "-vide-" && (
      <label>
          Choisissez le projet dans lequel envoyer les documents:
          <select values={this.state.values} onChange={this.handleChange}>

            <option values="-vide-">Veuillez selectioner l'environnement</option>
            {optionTemplate}
          </select>
      </label>)}
        {this.state.envValue !== "-vide-" && (
          <Home environnement={this.state.envValue}></Home>
        )

        }
        </div>
    );
  }
}


export default Env;
