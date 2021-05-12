import React, { Component } from "react";

import UserService from "../services/user.service";
import Table from "./table-component";

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

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUser: {
        username: "",
        email: "",
        usertype: 1
      }
    };

    this.handleSubmit.bind(this);
    this.updateMail.bind(this);
    this.setUsertype.bind(this);
    this.updateUsername.bind(this);
  }

  columns =
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
      Header: 'Roles',
      accessor: 'roles',
      Cell: cell => (
        <div>
            {roleOptionTemplate(cell)}
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
        <button onClick={this.handleDeleteClick(cell.row.values)}>
          Delete
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

  setUsertype = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        usertype: Number(value)
      }
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const ret = UserService.createUser(this.state.newUser);
    this.refreshUserList();
    return ret;
  }

  refreshUserList() {
    UserService.getUsers().then(
      response => {
        this.setState(() => ({
          users: response.data
        }))
      },
      error => {
        console.log(error);
      }
    );
  }

  handleDeleteClick(user) {
    return () => {
      console.log("Trying to delete :", user);
      const ret = UserService.deleteUser(user);
      this.refreshUserList();
      return ret;
    }
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
                <th>Nom d'Utilisateur</th>
                <th>Adresse Email</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input id="username" value={this.state.newUser.username} onChange={this.updateUsername} required/></td>
                <td><input id="email" value={this.state.newUser.email} onChange={this.updateMail} type="email" required/></td>
                <td>
                  <input type="radio" username="usertype" value={1} onChange={this.setUsertype} checked={this.state.newUser.usertype === 1}/>
                  <label htmlFor="user">Utilisateur</label>
                  <input type="radio" username="usertype" value={2} onChange={this.setUsertype} checked={this.state.newUser.usertype === 2}/>
                  <label htmlFor="mod">Modérateur</label>
                  <input type="radio" username="usertype" value={3} onChange={this.setUsertype} checked={this.state.newUser.usertype === 3}/>
                  <label htmlFor="admin">Administrateur</label>
                </td>
                <td>
                  <button className="btn btn-success">Créer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <Table columns={this.columns} data={this.state.users} deleteUser={this.handleDeleteClick}></Table>
      </div>
    );
  }
}
