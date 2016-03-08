"use strict";

var App = {
  init: function() {
    //var visualizer = require('Visualizer');
    var cubes = require('Cubes');
    var view = new cubes();
    view.init();
  }
};

module.exports = App;
