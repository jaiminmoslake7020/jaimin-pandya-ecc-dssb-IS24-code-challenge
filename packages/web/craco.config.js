// craco.config.js
module.exports = {
  webpack: {
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.jpg', '.jpeg', '.mp4', '.png'],
    },
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
  },
  typescript: {
    enableTypeChecking: true /* (default value)  */
  },
  eslint: {
    enabled: true
  },
  style: {
    postOptions: {
      plugins: [
        // eslint-disable-next-line global-require
        require('tailwindcss'),
        // eslint-disable-next-line global-require
        require('autoprefixer'),
      ],
    },
  },
  babel: {
    loaderOptions: {
      ignore: [],
    },
  },
}
