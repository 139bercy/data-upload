import React, { Component } from "react";

export default class UploadFiles extends Component {
    render() {
        return (
            <div>
                {this.props.acceptedFiles && this.props.acceptedFiles.length > 0 && (
                    <div className="uploaded-files" role="alert">
                        Fichiers de données transférés  :
                        <ul>
                            {this.props.acceptedFiles.map((item, i) => {
                                return <li key={i}>{item}</li>;
                            })}
                        </ul>
                    </div>
                    )}
            </div>
        )
    }
}
