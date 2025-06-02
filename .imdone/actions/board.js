const path = require('path');

// This module must export a function that returns an array of BoardActions
// https://imdone.github.io/imdone-api/classes/plugin.Plugin.html#getboardactions
module.exports = function () {
  const project = this.project;
  return [
    {
      title: 'Open in vscode', // This is what displays in the main menu
      keys: ['alt+o'], // This is the keyboard shortcut
      icon: 'code', // This is the font awesome icon that displays in the main menu
      action(task) {
        const url = `vscode://file/${path.join(project.path, task.path)}:${task.line}`;
        project.openUrl(url);
      },
    },
  ];
};
