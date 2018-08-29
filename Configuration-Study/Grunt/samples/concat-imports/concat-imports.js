var cheerio = require('cheerio');

module.exports = function(grunt)
	{
	grunt.registerMultiTask('concat-imports', "Concatenate HTML imports", function()
		{
		this.files.forEach(function(file)
			{
			debugger;
			var target = file.name;
			var links = file.links;
			var options = file.modifiers;
			
			var stylesOnly = !!(options['styles-only']);
			
			var contents;
			
			if (stylesOnly)
				contents = "";
			else {
				contents = file.src.map(function(filepath) {
					var content = grunt.file.read(filepath);
					var $ = cheerio.load(content);
					$("script").remove();
					$("link").remove();
					
					return $.root().html().replace(/\s+/g, ' ');
				}).join("\n");
			}
			
			var base = cheerio.load(contents);
			var root = base.root();
			
			if (!stylesOnly) {
				var targetfilename = "./" + target + ".js";
				var link = base("<script/>").attr("type", "text/javascript").attr("src", targetfilename);
				root.prepend(link);
				}
			
			var lessfilename = "./" + target + ".css";
			var rel = options.rel || "stylesheet";
			var lessLink = base("<link/>").attr("rel", rel).attr("type", "text/css").attr("href", lessfilename);
			root.prepend(lessLink);
			
			if (!stylesOnly) {
				links.reverse().forEach(function(link) {
					var target = "./" + link;
					var linkEl = base("<link/>").attr("rel", "import").attr("href", target);
					root.prepend(linkEl);
				});
			}
			
			var importLink = base("<script/>").attr("src", "../ui/import.js");
			root.append(importLink);
			
			grunt.file.write(file.dest, root.html());
			grunt.log.write("File ").write(file.dest).writeln(" created.");
			});
		});
	};
