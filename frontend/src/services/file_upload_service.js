import request from "superagent";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return request.post("http://localhost/api/upload").attach("dropzone", formData);
    }
}

export default new UploadFilesService();
