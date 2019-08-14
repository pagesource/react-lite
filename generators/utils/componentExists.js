/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const atomComponents = fs.readdirSync(path.join(__dirname, '../../src/components/atoms'));
const moleculeComponents = fs.readdirSync(path.join(__dirname, '../../src/components/molecules'));
const organismComponents = fs.readdirSync(path.join(__dirname, '../../src/components/organisms'));
const templateComponents = fs.readdirSync(path.join(__dirname, '../../src/components/templates'));
const components = atomComponents
  .concat(moleculeComponents)
  .concat(organismComponents)
  .concat(templateComponents);

const atomContainers = fs.readdirSync(path.join(__dirname, '../../src/containers/atoms'));
const moleculeContainers = fs.readdirSync(path.join(__dirname, '../../src/containers/molecules'));
const organismContainers = fs.readdirSync(path.join(__dirname, '../../src/containers/organisms'));
const templateContainers = fs.readdirSync(path.join(__dirname, '../../src/containers/templates'));
const containers = atomContainers
  .concat(moleculeContainers)
  .concat(organismContainers)
  .concat(templateContainers);

const componentContainer = {
  components,
  containers,
};

function componentExists(comp, category) {
  return componentContainer[category].indexOf(comp) >= 0;
}

module.exports = componentExists;
