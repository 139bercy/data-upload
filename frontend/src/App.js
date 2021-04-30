import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Home from "./components/home.component";
// import Env from "./components/env.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardEnvironnements from "./components/board-environnements"


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showEnvironnementBoard: true
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showEnvironnementBoard: user.roles.includes("ROLE_MODERATOR")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showEnvironnementBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Envoi de fichiers
                </Link>
              </li>
            )}
            {showModeratorBoard && !showAdminBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Gestion des utilisateurs
                </Link>
              </li>
            )}
          </div>

          <div className="navbar-nav ml-auto">

            {showEnvironnementBoard && (
              <li className="nav-item">
                <Link to={"/environnements"} className="nav-link">
                  Gestion des environnements
                </Link>
              </li>
            )}
            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Administration des comptes
                  </Link>
                </li>
            )}
            {currentUser ? (
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Déconnexion du compte {currentUser.username}
                  </a>
                </li>
            ) : (
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Connexion
                  </Link>
                </li>
            )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/env"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/environnements" component={BoardEnvironnements} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
