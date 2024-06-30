// webpack.config.js

const path = require('path');

module.exports = {
  //... other configurations...
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
      '@src': path.resolve(__dirname, 'src'),
    },
    fallback: {
      "buffer": require.resolve("buffer/"),
    },
  },
};
