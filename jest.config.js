const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(c|sa|sc)ss$': 'identity-obj-proxy'
  },
  transform: {
    '\\.jsx?$': 'babel-jest',
    '\\.(a?png|avif|gif|jpe?g|svg|webp|eot|otf|ttf|woff2?)$': '<rootDir>/fileTransformer.js'
  }
};

module.exports = config;
