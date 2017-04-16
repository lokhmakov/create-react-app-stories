function cssLoader(conf) {
  return String(conf.test) == String(/\.css$/)
}

function rewireIsomorphicStyleLoader(config) {
  const index = config.module.loaders.findIndex(cssLoader)
  config.module.loaders[index] = {
    test: /\.css$/,
    loader: `isomorphic-style!css?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss`
  }

  return config
}

module.exports = rewireIsomorphicStyleLoader
