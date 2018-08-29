module.exports = function(grunt)
	{
	var path = require('path');
	var fs = require('fs');

	var getDirectory = function getDirectory(filepath)
		{
		var parts = filepath.split(path.sep);
		parts.pop();
		return parts.join(path.sep);
		}
		
	var resolveURL = function resolveURL(url, srcDir, destDir, lessVariable)
		{
		var fullurl = path.join(srcDir, url);
		var relative = path.relative(destDir, fullurl);
		if (path.sep == "\\")
			relative = relative.replace(/\\/g, "/");
			
		if (lessVariable)
			{
			var parts = relative.split("/");
			parts.shift();
			parts.unshift("@{" + lessVariable + "}");
			relative = parts.join("/");
			if(parts.length === 1)
				{
					relative= relative + "/";
				}
			}
			
		// This is for the mixin used in results.css, which uses .remove-element-styles("../../")
		// This is the only exception we have, used in one place, from Bali we are not use these kind of mixins.
		if (relative === "..")
			{
			relative = "../";
			}
		return relative;
		}
	
	var importRegex = /@import(?: (\(.+\)))? \"(.+?)\";/g;
	var urlRegex = /\((?:\"(.+?)\"|'(.+?)')\)/g;
	
	grunt.registerMultiTask('concat-less', "Concatenate LESS files", function()
		{
		var target = this.target;
		var options = this.options();
		
		var lessVariable = options.lessVariable;
		
		this.files.forEach(function(file)
			{
			var imports = {};
			
			var dest = file.dest;
			var destDir = getDirectory(dest);
			
			var contents = file.src.map(function(filepath)
				{
				var srcDir = getDirectory(fs.realpathSync(filepath));
				
				var content = grunt.file.read(filepath);
				
				content = content.replace(importRegex, function(fullMatch, modifier, path)
					{
					var resolved = resolveURL(path, srcDir, destDir);
					imports[resolved] = {'path' : resolved, 'modifier' : modifier};
					return "";
					});
					
				content = content.replace(urlRegex, function(fullMatch, c1, c2)
					{
					var capture = c1 || c2;
					// Dropping less variable reference as we don't want to use any base_url reference as in earlier release, we just leave it as relative url. 
					// The base_url is posing lot of problems in cases where OTMM is behind the firewall.
					var resolvedPath = resolveURL(capture, srcDir, destDir);
					return "('" + resolvedPath + "')";
					});
					
				content = content.replace(/\n(\n)+/g, '\n');
					
				return content;
				}).join("\n");
				
			var output = Object.keys(imports).map(function(i)
				{
				var obj = imports[i];
				var parts = ['@import'];
				if (obj.modifier)
					parts.push(obj.modifier);
				parts.push('"' + obj.path + '";');
				
				return parts.join(" ");
				}).join("\n");
				
			output += "\n" + contents;
			
			grunt.file.write(dest, output);
			grunt.log.write("File ").write(file.dest).writeln(" created.");
			});
		});
	};
