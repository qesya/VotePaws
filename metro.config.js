const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

// Exclude test files from the bundle
config.resolver.blockList = exclusionList([/.*\.test\.(js|jsx|ts|tsx)$/]);

module.exports = config;
