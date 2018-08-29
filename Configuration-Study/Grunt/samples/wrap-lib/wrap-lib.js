module.exports = function(grunt)
	{
	var extend = require("util")._extend;
	
	var noconflict = function(namespace, jq) {
		var space = namespace.split(".").reduce(function(cur, part) {
			if (!(part in cur))
				cur[part] = {};
				
			return cur[part];
		}, window);
		
		if (jq && window.$)
			space.$ = $.noConflict(true);
	}
	
	function namespaceLibraries(src, dest, namespace, options) {
		var input = grunt.file.read(src);
		
		var jQuery = !!(options.jQuery);
		var output = input + "\n(" + noconflict.toString() + ")('" + namespace + "', " + jQuery + ");";
		
		grunt.file.write(dest, output);
	}
	
	function wrapToNamespace(src, dest, namespace, options) {
		var map = {};
		
		if (options.jQuery) {
			map.$ = map.jQuery = namespace + ".$";
		}

		var libs = Object.keys(map);
		var inputs = libs.map(function(lib) { return map[lib] });
		if (libs.length) {
			var input = grunt.file.read(src);
			var output = "(function(" + libs.join(", ") + ") {\n" + input + "\n })(" + inputs.join(", ") + ");";
			grunt.file.write(dest, output);
		}
	}
	
	function wrapHTML(src, dest, namespace, options) {
		if (options.jQuery) {
			var input = grunt.file.read(src);
			
			var output = input.replace(/\$/g, namespace + ".$");
			output = output.replace(/jQuery/g, namespace + ".jQuery");
			
			grunt.file.write(dest, output);
		}
	}
	
	grunt.registerMultiTask('wrap-lib', "Create wrappers which redefine libraries to avoid global scopes", function() {
		var target = this.target;
		var options = this.options();
		
		this.files.forEach(function(file) {
			var src = file.src;
			var absoluteDest = file.dest;
			
			var namespace = file.namespace;
			var provider = !!(file.provider);
			
			src.forEach(function(srcfile) {
				var dest = absoluteDest || srcfile;
				if (/\.html$/.test(srcfile))
					wrapHTML(srcfile, dest, namespace, file);
				else {
					if (provider)
						namespaceLibraries(srcfile, dest, namespace, file);
					else
						wrapToNamespace(srcfile, dest, namespace, file);
				}
			});
		});
	});
};
