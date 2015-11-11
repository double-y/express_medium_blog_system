var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './jsx/main.js',
    output: {
        path: 'public/javascripts',
        filename: 'bundle.js'
    },
    resolve: {
        root: [path.join(__dirname, "public/components")]
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'jsx'),
                query: {
                  presets: 'react',
                },
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};
