module.exports = config:
  paths:
    watched: ['app'] # vendor included by Brunch as bower_components
    public: 'public'
  files:
    javascripts:
      joinTo:
        'scripts/vendor.js': /^bower_components/
        'scripts/app.js': /^app/
    stylesheets:
      joinTo: 'styles/app.css'
    templates:
      joinTo: 'scripts/templates.js'
  conventions:
    assets: /assets[\\/]/
  plugins:
    imageoptimizer:
      smushit: true,
      path: 'app/images/'
  server:
    run: yes
    port: 4567
