import React, { Component } from "react";
import axios from 'axios';

import Dropzone from "react-dropzone";
import authHeader from "../services/auth-header";
import Environnement from "../services/environnement.service";

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      environnements: [],
      environnement: "",
      content: ""
    };

    this.onDropRejected = (rejectedFiles) => {
      rejectedFiles.forEach(file => {
        console.log("Rejected ", file.name);
      })
    };

    this.onDropAccepted = (acceptedFiles) => {
      acceptedFiles.forEach(file => {
        const formData = new FormData();
        console.log("filename :" + file.name);
        formData.append(file.name, file);
        console.log(formData.getAll(file.name));
        axios.post('/api/upload/' + this.state.environnement, formData, { headers: authHeader() })
          .then(res => {
              console.log(res);
            }
          ).catch(err => {
          console.log(err);
        });
      })
    };
  }


  componentDidMount() {
    Environnement.getAllEnv()
      .then(
        (response) => {
          console.log(response.data)
          this.setState({
            environnements: response.data
          });
        })
      .catch(
        (error) => {
          console.log("TODO gestion de l'erreur", error)
        }
      )
  }

  handleChange(e) {
    this.setState({ environnement: e.target.value });
  }


  render() {

    let optionTemplate = this.state.environnements.map(v => (
      <option key={v.name} value={v.name}>{v.name}</option>
    ));
    return (
      <div className="container">
        <header className="jumbotron">
          <label>Choisissez le projet dans lequel envoyer les documents:
            <select onChange={this.handleChange} defaultValue={""}>
              <option value="">Veuillez selectioner l'environnement</option>
              {optionTemplate}
            </select>
          </label>
          {this.state.environnement !== "" &&
          <label>Veuillez utiliser le cadre ci-dessous pour envoyer les fichiers de données
            dans {this.state.environnement}</label>
          }
        </header>
        <div style={this.state.environnement === "" ? { pointerEvents: "none", opacity: "0.4" } : {}}>
          <Dropzone
            onDropAccepted={this.onDropAccepted}
            onDropRejected={this.onDropRejected}
            accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default Home;
