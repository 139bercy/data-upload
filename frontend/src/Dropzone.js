import React from "react";
import { useDropzone } from "react-dropzone";

const getClassName = (baseClassName, isActive) => {
    if (!isActive) return baseClassName;
    return `${baseClassName} ${baseClassName}-active`;
}

const Dropzone = ({onDrop, accept}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return (
        <>
            <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
                <input className="dropzone-input" name="dropzone" {...getInputProps()}/>
                <div className="text-center">
                    {isDragActive ? (
                        <p className="dropzone-content">Déposez le fichier ici !</p>
                    ) : (
                        <p className="dropzone-content">
                            Glissez-déposez ici, ou cliquez pour sélectionner des fichiers
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

/*

            <div className="sendContainer" name="sendContainer">
                <button className="sendButton" type="button">
                    Upload files
                </button>
            </div>
            */

export default Dropzone;
