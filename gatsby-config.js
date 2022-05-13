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
  siteMetadata: {
    title: "Coconut Global NFT Marketplace",
    titleTemplate: "Coconut Global NFT Marketplace",
    description:
      "Coconut Global - The best global short video NFT Marketplace",
    url: "https://app.coconut.global", // No trailing slash allowed!
    image: "./public/ccn_logoOF.png", // Path to the image placed in the 'static' folder, in the project's root directory.
    // twitterUsername: "@occlumency",
  },
};
