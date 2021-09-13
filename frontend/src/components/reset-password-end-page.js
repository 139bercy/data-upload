// Note: Uncomment import lines during working with JSX Compiler.
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire !
      </div>
    );
  }
};

const isSame = (initialValue) => {
  return value => {
    if (value && initialValue() !== value) {
      return (
        <div className="alert alert-danger" role="alert">
          Les mots de passe ne correspondent pas !
        </div>
      );
    }
  }
}

const message = 'Votre mot de passe a été réinitialisé. Vous allez être redirigé vers la page de connexion...'

export default class ResetPasswordEnd extends Component {
  constructor(props) {
    super(props);

    this.history = props.history

    this.state = {
      token: props.match.params.token,
      password: "",
      password2: "",
      loading: false,
      message: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    AuthService.resetPasswordEnd(this.state.password, this.state.token)
    .then(() => {
      this.setState({
        loading: false,
        message: message
      })
      setTimeout(() => {
        this.history.push('/login');
      }, 3000)
    })
    .catch((error) => {
      if (error.response.status === 403) {
        this.setState({
          loading: false,
          message: error.response.data.message
        })
      } else if (error.response.status === 406) {
        this.setState({
          loading: false,
          message: error.response.data[0]
        })
      } else {
        this.setState({
          loading: false,
          message: "Une erreur inconnue est survenue. Veuillez contacter le support."
        })
      }
    })
  };
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="marianne.svg"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="password">Nouveau mot de passe :</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password2">Nouveau mot de passe :</label>
              <Input
                type="password"
                className="form-control"
                name="password2"
                value={this.state.password2}
                onChange={this.onChangePassword2}
                validations={[required, isSame(() => this.state.password)]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Valider le nouveau mot de passe</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
        </Form>
        </div>
        <div className="col-md-12">
          <h4>Règles de sécurié concernant la définition d'un mot de passe :</h4>
            <ul>
              <li>Doit contenir au moins 14 caractéres</li>
        			<li>Doit contenir au moins un caractére spéciale</li>
        			<li>Doit contenir au moins une majuscule</li>
          		<li>Doit contenir au moins une miniscule</li>
              <li>Doit contenir au moins un chiffre</li>
        			<li>Pas d'éspace</li>
            </ul>
        </div>
      </div>
    );
  }
};
