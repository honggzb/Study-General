## Dynamically add version number to application based on grunt

### Method 1: grunt-string-replace

- [grunt-string-replace](https://github.com/erickrdch/grunt-string-replace)
- use the text {{ VERSION }} which gets replaced with the version number set in the package.json file.
- modify Gruntfile.js

```javascript
'string-replace': {
  version: {
    files: {
      // the files I did string replacement on
    },
    options: {
      replacements: [{
        pattern: /{{ VERSION }}/g,
        replacement: '<%= pkg.version %>'
      }]
    }
  }
},
pkg: grunt.file.readJSON('package.json'),

// These plugins provide necessary tasks.
grunt.loadNpmTasks('grunt-string-replace');
// Default task.
grunt.registerTask('default', ['string-replace']);
```

### Method 2: grunt-string-replace

- version.html
  - `<body>@@advisorVersion</body>`
- gruntfile.js

```javascript
grunt.initConfig({
  advisorVersion: { // replaces the version used in local development bypass
    options: {
      patterns: [{
              match: 'advisorVersion',
              replacement: advisorVersion,
            }],
      },
      files: [
          ['<%= yeoman.dist %>/version.html'],
          dest: '<%= yeoman.dist %>/version.html',
      }],
      },
  }
})
//...
grunt.registerTask('build', function (target) {
    var tasks = [
      'clean:dist',
      'copy:vendor',
      'concurrent:prod',  // run concurrent tasks
      'sync:build',  // move built files into build folder
      'createIndex',  // creates index.html
      'minify',  // minifying and optimizing build below
      'replace:advisorVersion',  // updates version.html
    ];
//...
}
```
