const css = require('./rewire/css')

module.exports = function override(config, env) {
  config = css(config)
  return config
}
