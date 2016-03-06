"use strict";

var App = {
  init: function() {
    var view = require('Visualizer');
    var client = new view();
    client.init();
  }
};

module.exports = App;
