import React, { Component } from "react";

import EnvironnementService from "../services/environnement.service";
import Table from "./table-component";

export default class BoardEnvironnementsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environnements: [],
      environmentName: ""
    };
  }

  columns =
    [
      {
        Header: "Nom de l'environnement",
        accessor: 'name',
      },
      {
        Header: "Supprimer",
        Cell: (cell) => (
          <button type="button" className="btn btn-danger"
                  onClick={() => this.deleteEnvironnement(cell.row.values.name)}>
            Supprimer
          </button>
        )
      },
    ];


  componentDidMount() {
    EnvironnementService.getAllEnvironnements().then(
      response => {
        this.setState({
          environnements: response.data
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
          environnements: this.state.environnements.filter(environnement => {
            return environnement.name !== id;
          })
        });
      },
      error => {
        console.log("delete ERRROR" + error);
        alert(error.response.data.message);
      }
    );
  }

  createEnvironnement = (event) => {
    event.preventDefault();
    console.log(this.state.environmentName);
    EnvironnementService.createEnv(this.state.environmentName).then(
      response => {
        console.log(response.data);
        this.setState({
          environnements: this.state.environnements.concat(response.data)
        });
      },
      error => {
        console.log(error);
        alert(error.response.data.message);
      }
    );
  }

  updateEnvironmentName = (evt) => {
    this.setState({
      environmentName: evt.target.value
    });
  }

  AddEnv = () => {
    return (
      <div>
        <div className="container shadow-sm p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Ajout d'environnement</h3>

          <form className="col-auto" onSubmit={this.createEnvironnement}>
            <div className="row justify-content-md-center">
              <input type="text" className="col col-lg-2-auto form-control" id="newEnvironnement"
                     placeholder="nouvel environnement" value={this.state.environmentName}
                     onChange={this.updateEnvironmentName} required />
              <div className="col col-lg-1">
                <button className="btn btn-success">Ajouter</button>
              </div>
            </div>
          </form>
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

        <Table columns={this.columns} data={this.state.environnements}></Table>
      </div>
    );
  }
}
