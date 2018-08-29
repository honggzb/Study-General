module.exports = function(grunt)
	{
	var extend = require("util")._extend;
	
	grunt.registerMultiTask('scan-html', "Scan HTML imports to generate other configuration tasks", function()
		{
		var target = this.target;
		var options = this.options();
		
		var scanner = target == "appworks" ? require('./lib-scan-appworks.js') : require('./lib-scan.js');
		
		this.files.forEach(function(file)
			{
			var src = file.src;
			console.log("src: ", src);
			var task = scanner.scan(src);
			
			for (var name in task)
				{
					console.log("name: ", name);
				var existing = grunt.config(name);
				grunt.config(name, extend(existing || {}, task[name]));
				}
			});
		});
	};
