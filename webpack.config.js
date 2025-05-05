const path = require('path');

module.exports = {
  // Other webpack configuration options...

  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Set the path to your build folder
    historyApiFallback: true, // Enable client-side routing fallback
  },
};
