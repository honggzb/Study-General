/*global module:false*/
module.exports = function(grunt) { 
  
  var uglify = {
	'slimscroll' : {
		'src' : ['../html5/lib/slimscroll/jquery.slimscroll.js'],
		'dest' : '../html5/lib/slimscroll/jquery.slimscroll.min.js'
	},
	'grapnel' : {
		'src' : ['../html5/lib/grapnel/Grapnel.js'],
		'dest' : '../html5/lib/grapnel/Grapnel.min.js'
	},
	'masonry' : {
		'src' : ['../html5/lib/masonry/masonry.pkgd.js'],
		'dest' : '../html5/lib/masonry/masonry.pkgd.min.js'
	},
	'options' : {
		'sourceMap' : true,
		'screw_ie8' : true,
		'beautify' : false,
	}
  };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'YOUR_NAME; Licensed MIT */\n',
    // Task configuration.
    uglify: uglify
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('slimscroll', ['uglify:slimscroll']);
  grunt.registerTask('grapnel', ['uglify:grapnel']);
  grunt.registerTask('masonry', ['uglify:masonry']);
};
