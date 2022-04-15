const path = require('path');
const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        process: 'process',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib'
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        util: require.resolve('util/'),
        path: require.resolve("path-browserify"),
        electron: false
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process',
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.DefinePlugin({
        'process.env.NFT_CONTRACT_ADDRESS': JSON.stringify("0xa3bdd5b4845b9babcc774a5d692303582ffda686"),
        'process.env.SIMPLE_EXCHANGE_ADDRESS': JSON.stringify("0x93c5a9494beebfa84322ff554fc29712238d4e9d"),
        'process.env.BUSD_CONTRACT_ADDRESS': JSON.stringify("0xe9e7cea3dedca5984780bafc599bd69add087d56"),
        'process.env.CONT_CONTRACT_ADDRESS': JSON.stringify("0x04085647a69ba4b4101fef35fd60cd27d901fb55"),
        'process.env.GAS_LIMIT': 500000,
        'process.env.SERVICE_FEE': "2.5",
        'process.env.ADDRESS_API': JSON.stringify("https://conutapi.contenft.com"),
      })
    ],
  });

  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
          components: path.resolve(__dirname, 'src/components/'),
          assets: path.resolve(__dirname, 'src/assets/'),
          lib: path.resolve(__dirname, 'src/lib/'),
          store: path.resolve(__dirname, 'src/store/'),
        },
      },
    });
  }

  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /multiselect-react-dropdown/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};
