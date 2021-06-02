import React, { Component } from "react";
import axios from 'axios';

import Dropzone from "react-dropzone";
import IndexService from "../services/indexes.service";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      index: "",
      content: ""
    };

    this.handleChange = (event) => {
      this.setState({ index: event.target.value });
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
        axios.post('/api/upload/' + this.state.index, formData)
          .then(res => {
            console.log(res);
          }).catch(err => {
          console.log(err);
        });
      })
    };
  }

  componentDidMount() {
    IndexService.getAll()
      .then(
        (response) => {
          this.setState({
            indexes: response.data
          });
        })
      .catch(
        (error) => {
          console.log("TODO gestion de l'erreur", error)
        }
      )
  }


  render() {

    let optionTemplate = this.state.indexes.map(v => (
      <option key={v.name} value={v.name}>{v.name}</option>
    ));

    return (
      <div className="container">
        <header className="jumbotron">
          <label>Choisissez l'index dans lequel envoyer les documents:
            <select onChange={this.handleChange} defaultValue={""}>
              <option value="">Veuillez selectioner l'index</option>
              {optionTemplate}
            </select>
          </label>
          {this.state.index !== "" &&
          <label>Veuillez utiliser le cadre ci-dessous pour envoyer les fichiers de données
            dans {this.state.index}</label>
          }
        </header>

        <div style={this.state.index === "" ? { pointerEvents: "none", opacity: "0.4" } : {}}>
          <Dropzone
            onDropAccepted={this.onDropAccepted}
            onDropRejected={this.onDropRejected}
            accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Déposez des fichiers ici ou cliquez pour sélectionner des fichiers</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default Home;
