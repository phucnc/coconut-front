const globImporter = require('node-sass-glob-importer');

module.exports = {
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          importer: globImporter(),
        },
      },
    },
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-typescript`,
    'gatsby-plugin-tsconfig-paths',
  ],
};
