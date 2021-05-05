import React, { Component } from "react";

import EnvironnementService from "../services/environnement.service";

export default class BoardEnvironnementsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      inputValue: ""
    };
  }

  componentDidMount() {
    EnvironnementService.getAllEnvironnements().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteEnvironnement = (id) => {
    EnvironnementService.deleteEnvironnement(id).then(
      response => {
        this.setState({
          content: this.state.content.filter(environnement => {
            return environnement.name !== id;
          })
        });
      },
      error => {
        console.log("delete ERRROR" + error);
      }
    );
  }

  ListEnvironnements = () => {
    return (
      <div>
        {this.state.content.map((env) => (
          <div key={env.name} className="container shadow-sm p-3 mb-5 bg-body rounded bg-light">
            <div className="row justify-content-md-center">
              <div className="col col-lg-2">
                {env.name}
              </div>
              <div className="col col-lg-2">
                <button id={env.name} type="button" className="btn btn-danger" onClick={() => {
                  if (window.confirm('Voulez vous vraiment supprimer : ' + env.name)) this.deleteEnvironnement(env.name)
                }}>Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  createEnvironnement = (name) => {
    EnvironnementService.createEnv(name).then(
      response => {
        this.state.content.push(response.data)
        this.setState({
          content: this.state.content
        });
      },
      error => {
        console.log("Add ERRROR" + error);
      }
    );
  }

  updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
  }

  AddEnv = () => {
    return (
      <div>
        <div className="container shadow-sm p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Ajout d'environnement</h3>
          <div className="row justify-content-md-center">
            <input type="text" className="col col-lg-2-auto form-control" id="newEnv"
                   placeholder="nouvel environnement" value={this.state.inputValue}
                   onChange={this.updateInputValue}></input>
            <div className="col col-lg-2">
              <button id="add-env" type="button" className="btn btn-success"
                      onClick={() => this.createEnvironnement(this.state.inputValue)}>Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="text-center">Gestion des environnements</h3>
        </header>
        <this.AddEnv></this.AddEnv>
        <h3 className="text-center">Environnement existants</h3>
        <this.ListEnvironnements></this.ListEnvironnements>
      </div>
    );
  }
}
