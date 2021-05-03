import React, { Component } from "react";

import EnvironnementService from "../services/environnement.service";

export default class BoardEnvironnements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      deleteEnv: []
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
    EnvironnementService.deleteEnv(id).then(
      response => {
        this.setState({
          deleteEnv: response.data,     
          content : this.state.content.filter(environnement => {
            return environnement.name !== id;
          })
        });
        console.log("delete done" + this.state.deleteEnv.data);
      },
      error => {
        this.setState({
            deleteEnv:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        console.log("delete ERRROR" + this.state.deleteEnv.data);
      }
    );
    console.log(this.state.deleteEnv);
  }

  ListEnv = () => {
    return (
      <div>
        {this.state.content.map((env) => (
          <div className="container shadow-sm p-3 mb-5 bg-body rounded bg-light">
          <div className="row justify-content-md-center">
            <div className="col col-lg-2">
              {env.name} 
            </div>
            <div className="col col-lg-2">
            <button id={env.name} type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Voulez vous vraiment supprimer : ' + env.name)) this.deleteEnv(env.name)}} >Supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
  }

  createEnv = (name) =>{
    EnvironnementService.createEnv(name).then(
      response => {
        this.state.content.push(response.data)
        this.setState({
          content : this.state.content
        });
        console.log("delete done" + this.state.deleteEnv.data);
      },
      error => {
        this.setState({
            deleteEnv:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
        console.log("delete ERRROR" + this.state.deleteEnv.data);
      }
    );
    console.log(this.state.deleteEnv);
  }

  AddEnv = () => {
    return (
      <div>
          <div className="container shadow-sm p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Ajout d'environnement</h3>
          <div className="row justify-content-md-center">
            <input type="text" className="col col-lg-2-auto form-control" id="newEnv" placeholder="nouveau environnement"></input>
            <div className="col col-lg-2">
            <button id="add-env" type="button" className="btn btn-success" onClick={() => this.createEnv("need to get data from placeholder")}>Ajouter</button>
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
        <this.ListEnv></this.ListEnv>
      </div>
    );
  }
}
