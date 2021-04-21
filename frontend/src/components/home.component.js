import React, { Component } from "react";
import axios from 'axios';

import Dropzone from "react-dropzone";
import authHeader from "../services/auth-header";

class Home extends Component {
  constructor(props) {
    super(props);

    this.onDropRejected = (rejectedFiles) => {
      rejectedFiles.forEach(file => {
          console.log("Rejected ", file.name);
      })
    };

    this.onDropAccepted = (acceptedFiles) => {
      acceptedFiles.forEach(file => {
          const formData = new FormData();
          formData.append(file.name, file);
          console.log(formData.getAll(file.name));
          axios.post('/api/upload', formData, { headers: authHeader() })
          .then(res => {
              console.log(res);
          }
          ).catch(err => {
            console.log(err);
          });
      })
    };

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Veuillez utiliser le cadre ci-dessous pour envoyer les fichiers de données</h3>
        </header>
        <Dropzone
          onDropAccepted={this.onDropAccepted}
          onDropRejected={this.onDropRejected}
          accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"}
          >
            {({getRootProps, getInputProps}) => (
              <section className="dropzone">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
      </div>
    );
  }
}

export default Home;
