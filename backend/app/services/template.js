const fs = require('fs');
const Mustache = require('mustache');


async function render(attributes, template) {
  const templateString = await fs.promises.readFile(template)
  return Mustache.render(templateString.toString(), attributes);
}

module.exports = render;
