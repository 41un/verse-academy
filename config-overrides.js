module.exports = function override(config, env) {
    config.module.rules.push({
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre",
      exclude: /node_modules\/@web3modal\/scaffold/,
    });
  
    return config;
  };
