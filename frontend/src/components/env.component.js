import React, { Component } from "react";

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
    this.handleChange = this.handleChange.bind(this);
  }
  envValue = "0";
  
  handleChange(e) {
    console.log("Env Selected!!");
    console.log({env: e.target.value});
    this.envValue = e.target.value;
    this.setState({ env: e.target.value });
  }

  render() {
    let optionTemplate = this.state.values.map(v => (
      <option value={v.id}>{v.name}</option>
    ));

    const ChooseEnv = () =>  {
        console.log(this.envValue);
        if (this.envValue == 0){
              return (
                <label>
                    Choisissez le projet dans lequel envoyer les documents:
                    <select value={this.state.value} onChange={this.handleChange}>
                      {optionTemplate}
                    </select>
                </label>
              );
        }
         else{
             return (
              <Home environnement={this.state.value}>
              </Home>
             );
         }
    }

    return (
        <ChooseEnv></ChooseEnv>
    );
  }
}



export default Env;
