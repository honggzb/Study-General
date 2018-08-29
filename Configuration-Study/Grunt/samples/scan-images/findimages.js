var path = require('path');
var walk = require('walk');
var fs = require('fs-extra');

var srcDir = path.resolve("../../html5");
var imgDir = path.resolve(srcDir, "style/img");

var dirs = ['app','otmm','ui','widget','debug','lib','compliance','style'];

var dryRun = false;
var files = {};
process.argv.slice(2).forEach(function(arg) {
	if (arg == "--dry")
		dryRun = true;
	else
		files[arg] = true;
});

var hasSpecificFiles = !!Object.keys(files).length;

var walkOptions = {
	'filters' : fs.readdirSync(srcDir).filter(function(dir) {
		return (dirs.indexOf(dir) == -1)
	})
};

var exts = {'html' : true, 'js' : true, 'less' : true, 'css' : true};

var walker = walk.walk(srcDir, walkOptions);

var images = {};
var imagesByType = {};

walker.on("file", function(root, stats, next) {

	if (stats.type != "file")
		next();
	else {
		var ext = stats.name.split(".").pop();
		
		if (!exts[ext] || (hasSpecificFiles && !(stats.name in files)))
			next();
		else {
			var filename = [root,stats.name].join("/");
			
			var byType = (imagesByType[ext] || (imagesByType[ext] = []));
			
			fs.readFile(filename, {'encoding' : 'UTF-8'}, function(err, data) {
			
				if (err)
					throw err;
					
				if (dryRun)
					console.log(filename, ":");
					
				data.replace(/\/img\/([^"\']*)?/g, function(path, match) {
				
					if (match && !(match in images))
						images[match] = true;
						
					if (match && !(match in byType))
						byType[match] = true;
						
					if (dryRun && match)
						console.log(match);
					else if (!match)
						console.log("NO MATCH FOR", path, "in", filename);
				});
				
				next();
			
			});
		}
	}
});

walker.on("end", function() {

	if (!dryRun) {
		if (!fs.existsSync("results"))
			fs.mkdirSync("results");
	}
		
	var list = [];
		
	for (var image in images) {
		var folders = image.split("/");
		var fileName = folders.pop();
		
		folders.unshift("results");
		
		fs.mkdirsSync(folders.join(path.sep));
		
		var org = path.resolve(imgDir, image);
		
		if (!fs.existsSync(org))
			console.log("File does not exist: ", org, "from", image);
		else {
			if (dryRun)
				list.push(fileName);
			else
				fs.copySync(org, folders.join(path.sep) + path.sep + fileName);
		}
	}
	
	if (dryRun) {
		
		list.sort();
	
		fs.writeFileSync("output.txt", list.join("\r\n"), {'encoding' : 'UTF-8'});
	}
});
