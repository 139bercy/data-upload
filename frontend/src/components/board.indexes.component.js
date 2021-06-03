import React, { Component } from "react";

import IndexesService from "../services/indexes.service";
import Table from "./table-component";

// function onChange(index, field) {
//   return (event) => {
//     const oldField = index[field];
//     index[field] = event.target.value;
//     return indexService.update(index)
//       .catch(error => {
//         console.log(error);
//         alert(error.response.data.message);
//         index[field] = oldField;
//       });
//   }
// }
//
// function onNameChange(index) {
//   return onChange(index, "name");
// }
//
// function onPathChange(index) {
//   return onChange(index, "path");
// }

export default class BoardIndexesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      indexName: "",
      indexPath: "",
    };
  }

  columns =
    [
      {
        Header: "Nom de l'index",
        accessor: 'name',
        // Cell: cell => (
        //   <div>
        //     <input type="text" className="col col-lg-2-auto form-control"
        //            placeholder="Nom du nouvel index" value={cell.row.values.name}
        //            onChange={onNameChange(cell.row.values)} required />
        //   </div>
        // )
      },
      {
        Header: "Chemin du dossier",
        accessor: 'path',
        // Cell: cell => (
        //   <div>
        //     <input type="text" className="col col-lg-2-auto form-control"
        //            placeholder="Chemin du dossier" value={cell.row.values.path}
        //            onChange={onPathChange(cell.row.values)} required />
        //   </div>
        // )
      },
      {
        Header: "Supprimer",
        Cell: (cell) => (
          <button type="button" className="btn btn-danger"
                  onClick={() => this.deleteIndex(cell.row.values.name)}>
            Supprimer
          </button>
        )
      },
    ];


  componentDidMount() {
    IndexesService.getAll().then(
      response => {
        this.setState({
          indexes: response.data
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteIndex = (id) => {
    IndexesService.delete(id).then(
      response => {
        this.setState({
          indexes: this.state.indexes.filter(index => {
            return index.name !== id;
          })
        });
      },
      error => {
        console.log("delete ERRROR" + error);
        alert(error.response.data.message);
      }
    );
  }

  createIndex = (event) => {
    event.preventDefault();
    IndexesService.create({ name: this.state.indexName, path: this.state.indexPath }).then(
      response => {
        console.log(response.data);
        this.setState({
          indexes: this.state.indexes.concat(response.data)
        });
      },
      error => {
        console.log(error);
        alert(error.response.data.message);
      }
    );
  }

  updateIndexName = (evt) => {
    this.setState({
      indexName: evt.target.value
    });
  }
  updateIndexPath = (evt) => {
    this.setState({
      indexPath: evt.target.value
    });
  }

  addIndex = () => {
    return (
      <div>
        <div className="container shadow-sm p-3 mb-5 bg-body rounded">
          <h3 className="text-center">Ajout d'index</h3>

          <form className="col-auto" onSubmit={this.createIndex}>
            <table className="table table-bordered table-striped text-center">
              <thead>
              <tr>
                <th>Nom du nouvel index</th>
                <th>Chemin du dossier</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <input type="text" className="col col-lg-2-auto form-control" id="indexName"
                         placeholder="Nom du nouvel index" value={this.state.indexName}
                         onChange={this.updateIndexName} required />
                </td>
                <td>
                  <input type="text" className="col col-lg-2-auto form-control" id="indexPath"
                         placeholder="Chemin du dossier" value={this.state.indexPath}
                         onChange={this.updateIndexPath} required />
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
          <h3 className="text-center">Gestion des indexes</h3>
        </header>
        <this.addIndex></this.addIndex>
        <h3 className="text-center">Indexes existants</h3>

        <Table columns={this.columns} data={this.state.indexes}></Table>
      </div>
    );
  }
}
