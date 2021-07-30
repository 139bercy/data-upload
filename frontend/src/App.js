import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import Login from "./components/login.component";
import ResetPassword from "./components/reset-password-page";
import ResetPasswordEnd from "./components/reset-password-end-page";
import Home from "./components/home.component";
import BoardAdmin from "./components/board-admin.component";
import BoardIndexesComponent from "./components/board.indexes.component"


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      isModerator: false,
      isAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      UserService.getUser(user)
        .then((response) => {
          this.setState({
            currentUser: response.data,
            isModerator: response.data.roles.includes("moderator"),
            isAdmin: response.data.roles.includes("admin"),
          });
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  logOut() {
    AuthService.logout();

  }

  render() {
    const { currentUser, isModerator, isAdmin } = this.state;

    return (
      <div>
        <nav id="top" className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Envoi de fichiers
                </Link>
              </li>
            )}
            {isModerator && !isAdmin && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Gestion des utilisateurs
                </Link>
              </li>
            )}
          </div>

          <div className="navbar-nav ml-auto">

            {isAdmin && (
              <li className="nav-item">
                <Link to={"/indexes"} className="nav-link">
                  Gestion des indexes
                </Link>
              </li>
            )}

            {(isModerator || isAdmin) && (
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

        <div className="container mt-5">
          <Switch>
            <Route exact path={["/", "/upload"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route path="/reset-password/:token" component={ResetPasswordEnd} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/indexes" component={BoardIndexesComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
