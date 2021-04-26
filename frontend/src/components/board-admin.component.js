import React, { Component } from "react";

import UserService from "../services/user.service";
import Table from "./table-component";

function handleDeleteClick(user) {
  console.log("Trying to delete :", user);
  UserService.deleteUser(user);
}

function handleUpdateClick(user) {
  console.log("Trying to update :", user);
  UserService.updateUser(user);
}

function onCheckboxChange() {
  console.log("NOT IMPLEMENTED");
}

const columns =
  [
    {
      Header: "Nom d'utilisateur",
      accessor: 'username',
    },
    {
      Header: 'mail',
      accessor: 'email',
    },
    {
      Header: "Actif",
      accessor: 'enable',
      Cell: cell => (
        <label>
          <input
            type="checkbox"
            checked={cell.row.values.enable}
            onChange={onCheckboxChange}
          />
        </label>
      )
    },
    {
      Header: "Supprimer",
      Cell: cell => (
        <button onClick={handleDeleteClick(cell.row.values.username)}>
          Delete
        </button>
      )
    },
    {
      Header: "Réinitialiser le mot de passe",
      // button
    }
  ];

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    if (this.state.users.length === 0) {
      UserService.getUsers().then(
        response => {
          this.setState({
            users: response.data
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
  }

  render() {
    return (
      // TODO: use the Table component with the state
      <div className="container">
        <Table columns={columns} data={this.state.users} ></Table>
      </div>
    );
  }
}
