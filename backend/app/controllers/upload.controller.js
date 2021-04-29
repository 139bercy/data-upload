
exports.upload = function(req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.params.env)
    console.log(req.body.env)
    let promises = Object.keys(req.files).map(filename => {
        console.log(filename);
        let file = req.files[filename];
        let uploadPath = process.env['FILE_STORAGE'] + file.name;

        // Use the mv() method to place the file somewhere on your server
        return file.mv(uploadPath);
    });

    Promise.all(promises)
        .then(results => res.send('File(s) uploaded!'))
        .catch (errors => res.status(500).send('No files were uploaded.'))
};
