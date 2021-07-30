const { Index } = require("../models");

exports.upload = async function (req, res) {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let index = await Index.findByPk(req.params.index);
  console.log(index)
  if (index === null) {
    return res.status(400).send(req.params.index + ' is not a valid index !');
  }

  let promises = Object.keys(req.files).map(filename => {
    console.log(filename);
    let file = req.files[filename];
    let uploadPath = process.env['FILE_STORAGE'] + '/' + index.path + '/' + file.name;
    console.log(uploadPath);

    // Use the mv() method to place the file somewhere on your server
    return file.mv(uploadPath);
  });

  Promise.all(promises)
    .then(results => res.send('File(s) uploaded!'))
    .catch(errors => res.status(500).send('No files were uploaded.'))
};
