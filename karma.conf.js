module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      '__tests__/lib/*.js',
      '__tests__/src/*.js'
    ],
    exclude: [],
    preprocessors: {
      '__tests__/src/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [require('browserify-istanbul')({
        instrumenter: require('isparta'),
        ignore: ['**/__tests__/**']
      }), 'babelify']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
