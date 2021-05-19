import React, { Component } from "react";

import UserService from "../services/user.service";
import Table from "./table-component";


const rolesList = { user: 'user', moderator: 'moderator', admin: 'admin' };
const rolesTrad = { 'user': 'Utilisateur', 'moderator': 'Modérateur', 'admin': 'Administrateur' };

function onEnableUserChange(user) {
  return () => {
    const oldEnable = user.enable;
    user.enable = !user.enable;
    return UserService.updateUser(user)
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
        user.enable = oldEnable;
      });
  }
}

function onRolesUserChange(user) {
  return (event) => {
    const oldRoles = user.roles;
    user.roles = defineRoles(event.target.value);
    return UserService.updateUser(user)
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
        user.roles = selectRole(oldRoles);
      });
  }
}

function selectRole(roles) {
  console.log(roles);
  if (roles.includes(rolesList.admin)) {
    return rolesList.admin;
  }
  if (roles.includes(rolesList.moderator)) {
    return rolesList.moderator;
  }
  if (roles.includes(rolesList.user)) {
    return rolesList.user;
  }
}

function defineRoles(role) {
  console.log(role);
  let roles = [];
  if (role === rolesList.admin) {
    console.log(rolesList.admin + ' included');
    roles.push(rolesList.admin);
  }
  if (role === rolesList.moderator || role === rolesList.admin) {
    console.log(rolesList.moderator + ' included');
    roles.push(rolesList.moderator);
  }
  if (role === rolesList.user || role === rolesList.moderator || role === rolesList.admin) {
    console.log(rolesList.user + ' included');
    roles.push(rolesList.user);
  }
  return roles;
}

function roleOptionTemplate(cell) {
  return Object.values(rolesList).map(role => (
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
        roles: [rolesList.user]
      }
    };

    this.handleSubmit.bind(this);
    this.defineMail.bind(this);
    this.setRoles.bind(this);
    this.defineUsername.bind(this);
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

  defineUsername = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      newUser:
        {
          ...prevState.newUser,
          username: value
        }
    }));
  }

  defineMail = (event) => {
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

    const roles = defineRoles(value);
    console.log(roles);
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        roles: roles
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
    this.setState(() => ({
      users: []
    }))
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
              <td><input id="username" value={this.state.newUser.username} onChange={this.defineUsername} required />
              </td>
              <td><input id="email" value={this.state.newUser.email} onChange={this.defineMail} type="email" required />
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
