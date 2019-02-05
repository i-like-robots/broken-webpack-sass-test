const path = require("path");
const CSSExtractPlugin = require("mini-css-extract-plugin");
const StyleOnlyEntries = require("webpack-fix-style-only-entries");

module.exports = {
  mode: "development",
  entry: {
    styles: "./src/input.scss"
  },
  output: {
    path: path.resolve("./dist")
  },
  resolve: {
    // In which folders the resolver look for modules relative paths are
    // looked up in every parent folder (like node_modules) absolute
    // paths are looked up directly the order is respected
    modules: ["bower_components", "node_modules"],
    // package description files
    descriptionFiles: ["bower.json", "package.json"],
    // package.json / bower.json
    // fields for package resolution
    mainFields: ["browser", "module", "main"],
    // file names for directory resolution
    mainFiles: ["index", "main"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Extracts CSS into separate, non-JS files
          // https://github.com/webpack-contrib/mini-css-extract-plugin
          {
            loader: CSSExtractPlugin.loader
          },
          // Add support for handling .css files
          // https://github.com/webpack-contrib/css-loader
          {
            loader: require.resolve("css-loader"),
            options: {
              // Disable Webpack from resolving @import because Sass should
              // have already resolved and concatenated these files.
              import: false,
              // Disable Webpack from resolving url() because we do not
              // currently use this functionality.
              url: false
            }
          },
          // Enable use of Sass for CSS preprocessing
          // https://github.com/webpack-contrib/sass-loader
          {
            loader: require.resolve("sass-loader"),
            options: {
              // Disable formatting so that we don't spend time pretty printing
              outputStyle: "compressed",
              // Enable Sass to @import source files from installed dependencies
              includePaths: [
                "bower_components",
                "node_modules/@financial-times"
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CSSExtractPlugin(),
    // This plugin prevents empty JS bundles being created for CSS entry points
    // https://github.com/fqborges/webpack-fix-style-only-entries
    new StyleOnlyEntries({
      silent: true
    })
  ]
};
