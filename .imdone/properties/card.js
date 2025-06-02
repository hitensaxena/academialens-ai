// This module must export a function that returns an object with properties that will be available in your cards
// https://imdone.github.io/imdone-api/classes/plugin.Plugin.html#getcardproperties
module.exports = function ({ line, source }) {
  // const project = this.project

  // These are the properties that are available to use in your cards
  // Use ${property_name} to permanently insert the value of the property
  // Use {{property_name}} to insert the value of the property at runtime
  return {
    sourceLink: `[${source.path}:${line}](./${source.path}:${line})`,
  };
};
