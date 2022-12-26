const { createRequire } = require('module')
const rnRequire = createRequire(require.resolve('react-native'))

module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react'],
        [rnRequire.resolve('metro-react-native-babel-preset')],
    ],
}
