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

const message = "Un email vous a été envoyé pour vous permettre la réinitialisation de votre mot de passe.\nSi vous ne recevez pas de mail, veuillez vérifier l'adresse email indiqué dans ce formulaire ou contacter le support."

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      loading: false,
      message: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    AuthService.resetPassword(this.state.email)
    .then(() => this.setState({
      loading: false,
      message: message
    }))
    .catch(error => {
      console.error(error)
      if (error.status === 403) {
        this.setState({
          loading: false,
          message: message
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
              <label htmlFor="email">Email :</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
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
                <span>Réinitialiser le mot de passe</span>
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
      </div>
    );
  }
};
