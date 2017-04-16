process.env.NODE_ENV = 'production';

require('dotenv').config({
  silent: true,
  path: './.env.server',
});

const fs = require('fs');
const path = require('path');
const paths = require('react-app-rewired/config/paths');
const webpackConfig = paths.scriptVersionDir + '/config/webpack.config.prod';
const config = require(webpackConfig);
const override = require('../config-overrides-server');

require.cache[require.resolve(webpackConfig)].exports =
  override(config, process.env.NODE_ENV);

require.cache[require.resolve('fs-extra')].exports = {
  existsSync: () => {},
  emptyDirSync: () => {},
  copySync: () => {},
}

require(paths.scriptVersionDir + '/scripts/build');
