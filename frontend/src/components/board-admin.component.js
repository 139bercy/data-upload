import React, { Component } from "react";

import UserService from "../services/user.service";
import Table from "./table-component";


const roles = ['user', 'moderator', 'admin'];
const rolesTrad = { 'user': 'Utilisateur', 'moderator': 'Modérateur', 'admin': 'Administrateur'};

function onEnableUserChange(user) {
  return () => {
    user.enable = !user.enable;
    return UserService.updateUser(user);
  }
}

function onRolesUserChange(user) {
  return (event) => {
    user.roles = defineRoles(event.target.value);
    return UserService.updateUser(user);
  }
}

function selectRole(roles) {
  if (roles.indexOf('admin') !== -1) {
    return 'admin';
  }
  if (roles.indexOf('moderator') !== -1) {
    return 'moderator';
  }
  if (roles.indexOf('user') !== -1) {
    return 'user';
  }
}

function defineRoles(role) {
  let roles = [];
  if (role === 'admin') {
    roles.push('admin');
  }
  if (role === 'moderator' || role === 'admin') {
    roles.push('moderator');
  }
  if (role === 'user' || role === 'moderator' || role === 'admin') {
    roles.push('user');
  }
  return roles;
}

function roleOptionTemplate(cell) {
  return roles.map(role => (
      <option key={role} value={role}>{rolesTrad[role]}</option>
    )
  )
}

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUser: {
        username: "",
        email: "",
        roles: 'user'
      }
    };

    this.handleSubmit.bind(this);
    this.updateMail.bind(this);
    this.setRoles.bind(this);
    this.updateUsername.bind(this);
  }

  columns =
    [
      {
        Header: "Nom d'utilisateur",
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: cell => (
          <div>
            <select onChange={onRolesUserChange(cell.row.values)} defaultValue={selectRole(cell.row.values.roles)}>
              {roleOptionTemplate(cell)}
            </select>
          </div>
        )
      },
      {
        Header: "Actif",
        accessor: 'enable',
        Cell: cell => (
          <label>
            <input
              type="checkbox"
              defaultChecked={cell.row.values.enable}
              onChange={onEnableUserChange(cell.row.values)}
            />
          </label>
        )
      },
      {
        Header: "Supprimer",
        Cell: (cell) => (
          <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(cell.row.values)}>
            Supprimer
          </button>
        )
      },
      /*{
        Header: "Réinitialiser le mot de passe",
        Cell: cell => (
          <button onClick={handleDeleteClick(cell.row.values)}>
            Delete
          </button>
        )
      }*/
    ];

  componentDidMount() {
    if (this.state.users.length === 0) {
      this.refreshUserList();
    }
  }

  updateUsername = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      newUser:
        {
          ...prevState.newUser,
          username: value
        }
    }));
  }

  updateMail = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        email: value
      }
    }));
  }

  setRoles = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        roles: defineRoles(value)
      }
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return UserService.createUser(this.state.newUser)
      .then(response => {
          this.refreshUserList();
        }
      ).catch(error => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
        }
      );
  }

  refreshUserList() {
    UserService.getUsers().then(
      response => {
        this.setState(() => ({
          users: response.data
        }))
      }
    ).catch(
      error => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    );
  }

  deleteUser(user) {
      UserService.deleteUser(user).then(
        response => {
          this.refreshUserList();
        }
      ).catch(
        error => {
          console.log(error.response.data.message);
          alert(error.response.data.message);
        }
      );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="text-center">Gestion des utilisateurs</h3>
        </header>
        <form className="col-auto" onSubmit={this.handleSubmit}>
          <table className="table table-bordered table-striped text-center">
            <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Roles</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input id="username" value={this.state.newUser.username} onChange={this.updateUsername} required />
              </td>
              <td><input id="email" value={this.state.newUser.email} onChange={this.updateMail} type="email" required />
              </td>
              <td>
                <div>
                  <select onChange={this.setRoles}>
                    {roleOptionTemplate()}
                  </select>
                </div>
              </td>
              <td>
                <button className="btn btn-success">Créer</button>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
        <Table columns={this.columns} data={this.state.users}></Table>
      </div>
    );
  }
}
