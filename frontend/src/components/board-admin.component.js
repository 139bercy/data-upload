import React, { Component } from "react";

import UserService from "../services/user.service";
import Table from "./table-component";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
          // TODO: SQL request through api around there, store it in state
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

  render() {
    return (
      // TODO: use the Table component with the state
      <div className="container">
        <Table>???</Table>
      </div>
    );
  }
}
