const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  projectRoot: __dirname,
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../../'),
  ],
  resolver: {
    extraNodeModules: {
      'react-native': path.resolve(
        __dirname,
        '../../node_modules/react-native',
      ),
    },
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
