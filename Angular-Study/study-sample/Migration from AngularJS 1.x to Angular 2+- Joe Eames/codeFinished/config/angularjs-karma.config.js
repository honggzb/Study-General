// Karma configuration for angularJS
module.exports = function(config) {
  config.set({
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      '../public/vendor/jquery.min.js',
      '../public/vendor/1.6.3/angular.min.js',
      '../public/vendor/1.6.3/angular-route.min.js',
      '../public/vendor/1.6.3/angular-mocks.js',
      '../public/vendor/toastr.min.js',
      '../public/toastr/toastr.js',
      '../dist/dev/common.bundle.js',
      '../dist/dev/ng1.bundle.js',
      '../test/**/*.js'
    ],
    exclude: [
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
