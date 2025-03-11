const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**


 
  @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
    resolver: {
        assetExts: [...defaultConfig.resolver.assetExts, 'png', 'jpg', 'jpeg'],
    },
};

module.exports = mergeConfig(defaultConfig, config);
