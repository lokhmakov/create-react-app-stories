const css = require('./rewire/css')

var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = function override(config) {
  config = css(config)

  const pathAppBuild = config.output.path
  const publicPath = config.output.publicPath

  config.entry = ['./src/node_modules/app/server.js']
  config.externals = nodeModules
  config.output = {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: pathAppBuild,
    publicPath,
  }

  config.plugins = [
    config.plugins[2]
  ]

  config.target = 'node'
  config.node = {}
  return config
}
