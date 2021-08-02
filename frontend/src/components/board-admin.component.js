import React, { Component } from "react";
import Multiselect from 'multiselect-react-dropdown';

import UserService from "../services/user.service";
import IndexesService from "../services/indexes.service";
import RolesService from "../services/roles.service";
import Table from "./table-component";


const rolesList = { user: 'user', moderator: 'moderator', admin: 'admin' };
const rolesTrad = { 'user': 'Utilisateur', 'moderator': 'Modérateur', 'admin': 'Administrateur' };

function onEnableUserChange(user) {
  return async () => {
    const oldEnable = user.enable;
    user.enable = !user.enable;
    try {
      return await UserService.updateUser({username: user.username, enable: user.enable});
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      user.enable = oldEnable;
    }
  }
}

function onRolesUserChange(user) {
  return async (event) => {
    const oldRoles = user.roles;
    user.roles = defineRoles(event.target.value);
    try {
      return await UserService.updateUser({username: user.username, roles: user.roles});
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      user.roles = selectRole(oldRoles);
    }
  }
}

function selectRole(roles) {
  // roles = roles.map(role => role.name);
  if (roles.includes(rolesList.admin)) {
    return rolesList.admin;
  }
  if (roles.includes(rolesList.moderator)) {
    return rolesList.moderator;
  }
  if (roles.includes(rolesList.user)) {
    return rolesList.user;
  }
  return roles
}

function defineRoles(role) {
  let roles = [];
  if (role === rolesList.admin) {
    roles.push(rolesList.admin);
  }
  if (role === rolesList.moderator || role === rolesList.admin) {
    roles.push(rolesList.moderator);
  }
  if (role === rolesList.user || role === rolesList.moderator || role === rolesList.admin) {
    roles.push(rolesList.user);
  }
  return roles;
}

function selectIndexes(selectedIndexesNames, indexes) {
  if (selectedIndexesNames) {
  return indexes.filter(index => selectedIndexesNames.includes(index.name))
  }
  return []
}

function onSelectIndex(user, shouldAlwaysUpdate = true) {
  return async (_, selectedItem) => {
    if (!user.indexes) {
      user.indexes = []
    }
    user.indexes.push(selectedItem);
    if (shouldAlwaysUpdate) {
      try {
        return await UserService.updateUser({username: user.username, indexes: user.indexes});
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        user.indexes = user.indexes.filter(index => index !== selectedItem);
      }
    }
  }
}

function onRemoveIndex(user) {
  return async (_, removedItem) => {
    if (!user.indexes) {
      user.indexes = []
    }
    user.indexes = user.indexes.filter(index => index !== removedItem);
    try {
      return await UserService.updateUser({username: user.username, indexes: user.indexes});
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      user.indexes.push(removedItem);
    }
  }
}

function roleOptionTemplate(roles) {
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
        roles: [rolesList.user]
      },
      roles : [rolesList.user],
      indexes: []
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
              {roleOptionTemplate(this.state.roles)}
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
        Header: "Indexes",
        accessor: 'indexes',
        Cell: cell => (
          /*cell.row.values.roles.includes("admin") || */
          <Multiselect
            options={this.state.indexes} // Options to display in the dropdown
            selectedValues={selectIndexes(cell.row.values.indexes, this.state.indexes)} // Preselected value to persist in dropdown
            onSelect={onSelectIndex(cell.row.values)} // Function will trigger on select event
            onRemove={onRemoveIndex(cell.row.values)} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
          />
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

  async componentDidMount() {
    if (this.state.users.length === 0) {
      await this.refreshUserList();
    }
    await this.getRolesList();
    await this.getIndexesList();
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
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        roles: roles
      }
    }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UserService.createUser(this.state.newUser);
      this.refreshUserList();
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  }

  async refreshUserList() {
    this.setState(() => ({
      users: []
    }))
    let { data } = await UserService.getUsers()
    this.setState(() => ({
      users: data
    }))
  }

  async getRolesList() {
    let { data } = await RolesService.getAll()
    this.setState(() => ({
      roles: data
    }))
  }

  async getIndexesList() {
    this.setState(() => ({
      indexes: []
    }))
    let { data } = await IndexesService.getAll()
    this.setState(() => ({
      indexes: data
    }))
  }

  async deleteUser(user) {
    await UserService.deleteUser(user)
    this.refreshUserList();
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
              <th>Indexes</th>
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
                    {roleOptionTemplate(this.state.roles)}
                  </select>
                </div>
              </td>
              <td>
                <div>
                  <Multiselect
                    options={this.state.indexes} // Options to display in the dropdown
                    selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelectIndex(this.state.newUser, false)} // Function will trigger on select event
                    onRemove={onRemoveIndex(this.state.newUser, false)} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
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
