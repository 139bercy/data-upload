import React, { Component } from "react";

import EnvironnementService from "../services/environnement.service";

export default class BoardEnvironnements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
  }

  componentDidMount() {
    EnvironnementService.getAllEnv().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
            content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  deleteEnv = (id) => {
    // TODO pop up confirm delete
    //delete
    console.log(id);
  }

  ListEnv = () => {
    return (
      <div>
        {this.state.content.map((env) => (
          <div class="container shadow-sm p-3 mb-5 bg-body rounded bg-light">
          <div class="row justify-content-md-center">
            <div class="col col-lg-2">
              {env.name} 
            </div>
            <div class="col col-lg-2">
            <button id={env.name} type="button" class="btn btn-danger" onClick={() => { if (window.confirm('Voulez vous vraiment supprimer : ' + env.name)) this.deleteEnv(env.name)}} >Supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
  }

  AddEnv = () => {
    return (
      <div>
          <div class="container shadow-sm p-3 mb-5 bg-body rounded">
          <h3 class="text-center">Ajout d'environnement</h3>
          <div class="row justify-content-md-center">
            <input type="text" class="col col-lg-2-auto form-control" id="newEnv" placeholder="nouveau environnement"></input>
            <div class="col col-lg-2">
            <button id="add-env" type="button" class="btn btn-success" onClick={() => this.deleteEnv("need to get data from placeholder")}>Ajouter</button>
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
          <h3 class="text-center">Gestion des environnements</h3>
        </header>
        <this.AddEnv></this.AddEnv>
        <h3 class="text-center">Environnement existants</h3>
        <this.ListEnv></this.ListEnv>
      </div>
    );
  }
}
