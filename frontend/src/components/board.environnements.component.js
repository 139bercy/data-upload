import React, { Component } from "react";

import EnvironnementService from "../services/environnement.service";
import Table from "./table-component";

// function onChange(environnement, field) {
//   return (event) => {
//     const oldField = environnement[field];
//     environnement[field] = event.target.value;
//     return EnvironnementService.update(environnement)
//       .catch(error => {
//         console.log(error);
//         alert(error.response.data.message);
//         environnement[field] = oldField;
//       });
//   }
// }
//
// function onNameChange(environnement) {
//   return onChange(environnement, "name");
// }
//
// function onPathChange(environnement) {
//   return onChange(environnement, "path");
// }

export default class BoardEnvironnementsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environnements: [],
      environmentName: "",
      environmentPath: "",
    };
  }

  columns =
    [
      {
        Header: "Nom de l'environnement",
        accessor: 'name',
        // Cell: cell => (
        //   <div>
        //     <input type="text" className="col col-lg-2-auto form-control"
        //            placeholder="Nom du nouvel environnement" value={cell.row.values.name}
        //            onChange={onNameChange(cell.row.values)} required />
        //   </div>
        // )
      },
      {
        Header: "Hiérarchie de dossier",
        accessor: 'path',
        // Cell: cell => (
        //   <div>
        //     <input type="text" className="col col-lg-2-auto form-control"
        //            placeholder="Hiérarchie des dossiers" value={cell.row.values.path}
        //            onChange={onPathChange(cell.row.values)} required />
        //   </div>
        // )
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
    EnvironnementService.createEnv({ name: this.state.environmentName, path: this.state.environmentPath }).then(
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
  updateEnvironmentPath = (evt) => {
    this.setState({
      environmentPath: evt.target.value
    });
  }

  AddEnv = () => {
    return (
      <div>
        <div className="container shadow-sm p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Ajout d'environnement</h3>

          <form className="col-auto" onSubmit={this.createEnvironnement}>
            <table className="table table-bordered table-striped text-center">
              <thead>
              <tr>
                <th>Nom du nouvel environnement</th>
                <th>Hiérarchie de dossier</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <input type="text" className="col col-lg-2-auto form-control" id="newEnvironnementName"
                         placeholder="Nom du nouvel environnement" value={this.state.environmentName}
                         onChange={this.updateEnvironmentName} required />
                </td>
                <td>
                  <input type="text" className="col col-lg-2-auto form-control" id="newEnvironnementPath"
                         placeholder="Hiérarchie des dossiers pour l'environnement" value={this.state.environmentPath}
                         onChange={this.updateEnvironmentPath} required />
                </td>
                <td>
                  <button className="btn btn-success">Ajouter</button>
                </td>
              </tr>
              </tbody>
            </table>
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
