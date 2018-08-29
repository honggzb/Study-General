/*global module:false*/
module.exports = function(grunt)
{
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		meta            : {
			version: '0.1.0'
		},
		banner          : '/*! PROJECT_NAME - v<%= meta.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		'* http://PROJECT_WEBSITE/\n' +
		'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
		'YOUR_NAME; Licensed MIT */\n',
		// Task configuration.
		'scan-html'     : {
			'default' : ['../html5/ui/ui.html',
				'../html5/otmm/otmm_full.html',
				'../html5/widget/inspector/otmm-inspector-widget.html',
				'../html5/widget/asset/otmm-asset-widget.html',
				'../html5/widget/upload/otmm-upload-widget.html',
				'../html5/widget/components/otmm-asset-inspector/asset-inspector.html',
				'../html5/lib/lib.html',
				'../html5/widget/otmm-platform-lib.html',
				'../html5/widget/otmm-platform-ui.html',
				'../html5/widget/otmm-widget-base.html',
				'../html5/widget/otmm-widget-folder.html',
				'../html5/widget/otmm-widget-upload.html',
				'../html5/widget/otmm-widget-internal.html',
				'../ext-dist/repackage/otui.html'],
			'appworks': ['../html5/ui/ui_appworks.html',
				'../html5/otmm/otmm_appworks_full.html',
				'../html5/lib/lib.html',
				'../ext-dist/repackage/otui.html']
		},
		concat          : {
			'otmm-platform'         : {
				'src' : ['../html5/dist/otmm-platform-lib.js', '../html5/dist/otmm-platform-ui.js'],
				'dest': '../html5/dist/otmm-platform.js'
			},
			'otmm-appworks-platform': {
				'src' : ['../html5/dist_appworks/otmm-platform-lib.js', '../html5/dist_appworks/otmm-platform-ui.js'],
				'dest': '../html5/dist_appworks/otmm-platform.js'
			}
		},
		'mkdir'         : {
			'default'          : {
				options: {
					create: ['../html5/dist']
				}
			},
			'appworks'         : {
				options: {
					create: ['../html5/dist_appworks']
				}
			},
			'appworks-generate': {
				options: {
					create: ['../appworks/src']
				}
			}
		},
		uglify          : {
			'options'               : {
				'sourceMap': true,
				'screw_ie8': true,
				'beautify' : false,
				'mangle'   : {
					'reserved': ['ContentView', 'MainView', 'TabView', 'CardView']
				},
				'compress' : {
					'unused': false,
				}
			},
			'otmm-platform'         : {
				'src' : '../html5/dist/otmm-platform.js',
				'dest': '../html5/dist/otmm-platform.min.js'
			},
			'otmm-full'             : {
				'src' : '../html5/otmm/otmm.js',
				'dest': '../html5/dist/otmm-prod.min.js'
			},
			'otmm-platform-appworks': {
				'src' : '../html5/dist_appworks/otmm-platform.js',
				'dest': '../html5/dist_appworks/otmm-platform.min.js'
			},
			'otmm-full-appworks'    : {
				'src' : '../html5/otmm/otmm.js',
				'dest': '../html5/dist_appworks/otmm-prod.min.js'
			}
		},
		'concat-less'   : {
			'options': {
				'lessVariable': 'base_url'
			}
		},
		'concat-imports': {},
		'clean'         : {
			'options'          : {'force': true},
			'default'          : ['../html5/dist'],
			'appworks'         : ['../html5/dist_appworks'],
			'appworks-generate': ['../appworks/src'],
			'repackage-dist'   : ['../html5/dist/otui.*']
		},
		'sync'          : {
			'project'            : {
				'cwd' : '../html5/',
				'expand': true,
				'src' : '**',
				'dest': '../../dev-staging/artesia.ear/otmmux.war/ux-html/'
			},
			'extensions'         : {
				'cwd' : '../ext-dist/extensions/',
				'expand': true,
				'src' : '**',
				'dest': '../../dev-staging/artesia.ear/otmmux.war/ux-html/'
			},
			'project-appworks'   : {
				'cwd' : '../html5/',
				'expand': true,
				'src' : '**',
				'dest': '../../dev-staging/artesia.ear/otmmux.war/appworks/',
			},
			'extensions-appworks': {
				'cwd' : '../ext-dist/extensions/',
				'expand': true,
				'src' : '**',
				'dest': '../../dev-staging/artesia.ear/otmmux.war/appworks/'
			},
			'repackage'          : {
				'cwd' : '../html5/dist/',
				'expand': true,
				'src' : 'otui*.js',
				'dest': '../ext-dist/repackage/dist'
			}
		},
		'copy'          : {
			main: {
				expand: true,
				cwd   : "../html5/",
				src   : ['index-appworks.html', "style/**", "lib/mediaelement/style/**", "dist_appworks/**", "lib/imports/html-imports.min.js", "ui/import.js"],
				dest  : "../appworks/src/",
				rename: function(dest, path)
				{
					if(path.indexOf("index-appworks") != -1)
						path = path.replace("-appworks", "");
					return dest + "/" + path;
				}
			}
		},
		'less'          : {
			// Compile all targeted LESS files individually
			components: {
				options: {
					strictMath: true,
					imports   : {
						// Use the new "reference" directive, e.g.
						// @import (reference) "variables.less";
						reference: [
							"../appworks/src/style/format/mixins.less",
							"../appworks/src/style/format/variables.less"
						]
					}
				},
				files  : [
					{
						expand: true,
						// Compile each LESS component excluding "bootstrap.less",
						// "mixins.less" and "variables.less"
						src   : ['../appworks/src/**/*.less', '!{boot,var,mix}*.less'],
						ext   : '.css',
						extDot: 'first'
					}
				]
			}
		},
		'compress'      : {
			mobile: {
				options: {
					archive: function()
					{
						return '../appworks/config/mobile.zip';
					},
					mode   : 'zip'
				},
				files  : [
					{
						src   : ['**/*'],
						cwd   : '../appworks/src',
						expand: true
					}
				]
			},
			app   : {
				options: {
					archive: function()
					{
						return '../appworks/dist/OTMM-Mobile-App_1.0.0.zip';
					},
					mode   : 'zip'
				},
				files  : [
					{
						src   : ['**/*'],
						cwd   : '../appworks/config/',
						expand: true
					}
				]
			}
			
		},
		'wrap-lib'      : {
			'platform'         : {
				'src'      : '../html5/dist/otmm-platform-lib.js',
				'namespace': 'otui.lib',
				'jQuery'   : true,
				'provider' : true
			},
			'platform-appworks': {
				'src'      : '../html5/dist_appworks/otmm-platform-lib.js',
				'namespace': 'otui.lib',
				'jQuery'   : true,
				'provider' : true
			},
			'widget'           : {
				'src'      : ['../html5/dist/asset-inspector.js', '../html5/dist/otmm-platform-ui.js', '../html5/dist/otmm-asset-widget.js', '../html5/dist/otmm-upload-widget.js', '../html5/dist/otmm-widget-base.js', '../html5/dist/otmm-widget-folder.js', '../html5/dist/otmm-widget-upload.js', '../html5/dist/otmm-inspector-widget.js'],
				'namespace': 'otui.lib',
				'jQuery'   : true
			},
			'widget-appworks'  : {
				'src'      : ['../html5/dist_appworks/asset-inspector.js', '../html5/dist_appworks/otmm-platform-ui.js', '../html5/dist_appworks/otmm-asset-widget.js', '../html5/dist_appworks/otmm-upload-widget.js', '../html5/dist_appworks/otmm-widget-base.js', '../html5/dist_appworks/otmm-widget-folder.js', '../html5/dist_appworks/otmm-widget-upload.js', '../html5/dist_appworks/otmm-inspector-widget.js'],
				'namespace': 'otui.lib',
				'jQuery'   : true
			},
			'html'             : {
				'src'      : ['../html5/dist/otmm-upload-widget.min.html', '../html5/dist/otmm-asset-widget.min.html', '../html5/dist/otmm-widget-base.min.html', '../html5/dist/otmm-widget-folder.min.html'],
				'namespace': 'otui.lib',
				'jQuery'   : true
			},
			'html-appworks'    : {
				'src'      : ['../html5/dist_appworks/otmm-upload-widget.min.html', '../html5/dist_appworks/otmm-asset-widget.min.html', '../html5/dist_appworks/otmm-widget-base.min.html', '../html5/dist_appworks/otmm-widget-folder.min.html'],
				'namespace': 'otui.lib',
				'jQuery'   : true
			}
		}
	});
	
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('assemble-less');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadTasks('scan-html');
	grunt.loadTasks('concat-imports');
	grunt.loadTasks('concat-less');
	grunt.loadTasks('wrap-lib');
	grunt.loadNpmTasks('grunt-contrib-compress');
	
	// Default task.
	grunt.registerTask('default', ['default-otmm', 'default-appworks', 'generate-appworks']);
	grunt.registerTask('default-otmm', ['clean:default', 'mkdir:default', 'scan-html:default', 'concat', 'wrap-lib:platform', 'wrap-lib:widget', 'concat:otmm-platform', 'uglify:otmm-platform', 'uglify:otmm-full', 'concat-less', 'concat-imports', 'wrap-lib:html']);
	grunt.registerTask('default-appworks', ['clean:appworks', 'mkdir:appworks', 'scan-html:appworks', 'concat', 'wrap-lib:platform-appworks', 'wrap-lib:widget-appworks', 'concat:otmm-appworks-platform', 'uglify:otmm-platform-appworks', 'uglify:otmm-full-appworks', 'concat-less', 'concat-imports', 'wrap-lib:html-appworks']);
	grunt.registerTask('push', ['sync:project', 'sync:extensions']);
	grunt.registerTask('push-appworks', ['sync:project-appworks', 'sync:extensions-appworks']);
	grunt.registerTask('push-production', ['default-otmm', 'push']);
	grunt.registerTask('push-appworks-production', ['default-appworks', 'push-appworks']);
	grunt.registerTask('generate-repackage', ['default-otmm', 'sync:repackage', 'clean:repackage-dist']);
	grunt.registerTask('generate-appworks', ['clean:appworks-generate', 'mkdir:appworks-generate', 'copy:main', 'less', 'compress:mobile', 'compress:app']);
	grunt.registerTask('generate-appworks-zip', ['compress:mobile', 'compress:app']);
	grunt.registerTask('push-and-generate-appworks', ['push-appworks-production', 'generate-appworks'])
};
