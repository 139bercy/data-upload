import React, { Component } from "react";

import UserService from "../services/user.service";
import Table from "./table-component";

function handleDeleteClick(user) {
  return () => {
    console.log("Trying to delete :", user);
    return UserService.deleteUser(user);
  }
}

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
  return cell.row.values.roles.map(role => (
      <option key={role} value={role}>{role}</option>
    )
  )
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
      Cell: cell => (
        <button onClick={handleDeleteClick(cell.row.values)}>
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

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUser: {
        name: "",
        mail: "",
        usertype: "user"
      }
    };

    this.handleSubmit.bind(this);
    this.updateMail.bind(this);
    this.setUsertype.bind(this);
    this.updateName.bind(this);
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

  updateName = (event) => {
    this.setState({
      newUser:
        {
          name: event.target.value
        }
    });
  } 

  updateMail = (event) => {
    this.setState({
      newUser: {
        mail: event.target.value
      }
    });
  }

  setUsertype = (event) => {
    this.setState({
      newUser: {
        usertype: event.target.value
      }
    })
  }

  handleSubmit = (event) => {
    console.log(event, "NOT IMPLEMENTED")
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Nom d'Utilisateur</th>
                <th>Adresse Email</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input value={this.state.newUser.name} onChange={this.updateName} required/></td>
                <td><input value={this.state.newUser.mail} onChange={this.updateMail} required/></td>
                <td>
                  <input type="radio" id="user" name="usertype" value="user" onChange={this.setUsertype} checked={this.state.newUser.usertype === "user"}/>
                  <label htmlFor="user">Utilisateur</label>
                  <input type="radio" id="mod" name="usertype" value="mod" onChange={this.setUsertype} checked={this.state.newUser.usertype === "mod"}/>
                  <label htmlFor="mod">Modérateur</label>
                  <input type="radio" id="admin" name="usertype" value="admin" onChange={this.setUsertype} checked={this.state.newUser.usertype === "admin"}/>
                  <label htmlFor="admin">Administrateur</label>
                </td>
                <td>
                  <button>Créer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <Table columns={columns} data={this.state.users}></Table>
      </div>
    );
  }
}
