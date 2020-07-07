const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#61ABA2',
              '@link-color': '#61ABA2',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
