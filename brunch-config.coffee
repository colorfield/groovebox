module.exports = config:
  paths:
    watched: ['app'] # vendor included by Brunch as bower_components
    public: 'public' # explicitly set Brunch default
  files:
    javascripts:
      joinTo:
        'scripts/vendor.js': [/^bower_components/, /^vendor/]
        'scripts/app.js': /^app/
      # Overall ordering is [before] -> [bower] -> [vendor] -> [everything else] -> [after]
      # @see https://github.com/brunch/brunch/blob/master/docs/config.md#files
      order:
        before: [
        # needed for i18next before
          'bower_components/jquery/dist/jquery.js'
        ]
        #after: [
        # 'bower_components/i18next/i18next.js'
        #]
    stylesheets:
      joinTo:
        'styles/app.css': /^app/
        'styles/vendor.css': /^bower_components/
    templates:
      joinTo: 'scripts/templates.js'
  conventions:
    assets: /assets[\\/]/
  #plugins:
  #  imageoptimizer:
  #    smushit: false,
  #     path: 'assets/images/'
  server:
    run: yes
    port: 4567
