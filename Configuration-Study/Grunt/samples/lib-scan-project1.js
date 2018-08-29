var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var extend = require('util')._extend;

var distDir = fs.realpathSync('../html5/dist');
	
var generateGruntTask = function generateGruntTask(descriptor)
	{
	if (!descriptor)
		return undefined;
		
	var options = descriptor.options;
		
	var task = {};
	
	var stylesOnly = !!(options && options['styles-only']);
	
	console.log("Generating " + descriptor.name);
	var name = descriptor.name;
	var lessname = descriptor.name + "-less";
	var dir = distDir;
	
	var taskName = name.replace(/-/g, "_");
	
	if (!stylesOnly) {
		task.concat = {};
		task.concat[taskName] = {
			'src' : Object.keys(descriptor.js),
			'dest' : dir + path.sep + name + '.js'
		};
	}
	
	task.less = {};
	task.less[taskName] = {
		'src' : Object.keys(descriptor.less),
		'dest' : dir + path.sep + name + '.less'
	}
	
	if (!stylesOnly) {
		task.uglify = {};
		task.uglify[taskName] = {
			'src' : '<%= concat.' + taskName + '.dest %>',
			'dest' : dir + path.sep + name + '.min.js'
		};
	}
	
	task.imports = {};
	task.imports[taskName] = {
		'name' : name,
		'links' : Object.keys(descriptor.links),
		'modifiers' : descriptor.options,
		'src' : Object.keys(descriptor.html),
		'dest' : dir + path.sep + name + '.min.html'
	};
	
	return task;
	}
	
var exceptions = ['import.js'];
var fileOptions = {'encoding' : 'UTF-8'};

function getDescriptor()
	{
	return {
		'html' : {},
		'links' : {},
		'js' : {},
		'less' : {},
		'options' : {}
	}
	}
	
function getDirectory(filepath)
	{
	var parts = filepath.split(path.sep);
	parts.pop();
	return parts.join(path.sep);
	}
	
function readImport(el, dir, results)
	{
	var href = el.attr("href");
	var hrefpath = path.join(dir,href);
	
	// If this import goes directly to an entry in the dist dir, then don't read it, but mark it as a link to be inserted directly.
	if (hrefpath.indexOf(distDir) != 0)
		read(hrefpath, results);
	else
		results.links[path.basename(hrefpath)] = true;
	}
	
function readScript(el, dir, results)
	{
	var src = el.attr("src");
		
	// TODO make exceptions an option
	var srcpath = path.join(dir,src);
	var srcname = path.basename(srcpath);
	
	var result = getDescriptor();
	
	if (exceptions.indexOf(srcname) == -1)
		results.js[srcpath] = true;
	}

function readStylesheet(el, dir, results)
	{
	var href = el.attr("href");
	
	if (href)
		{
		var hrefpath = path.join(dir,href);
		if (!fs.existsSync(hrefpath))
			hrefpath = hrefpath.replace(/\.css$/, ".less");
			
		results.less[hrefpath] = true;
		}
	}
	
function readOptions(el, results)
	{
	el = el[0];
	if (el)
		extend(results.options, el.attribs);
	}
	
function read(filepath, files)
	{
	var content = fs.readFileSync(filepath, fileOptions);
	var $ = cheerio.load(content);
	
	var dir = getDirectory(filepath);
	
	files.html[filepath] = true;
	
	// Get a list of all the children in this file that we'll examine, which will return them in order.
	// We can then use that as an order for precedent.
	var children = $("prod-options,link[rel=import],script[src],link[rel=stylesheet]").filter(":not([no-concat])");
	
	var importChildren = [];
	children.each(function(index)
		{
		var $this = $(this);
		if ($this.is("prod-options"))
			readOptions($this, files);
		if ($this.is("link[rel=import]"))
			readImport($this, dir, files);
		else if ($this.is("script"))
			readScript($this, dir, files);
		else if ($this.is("link[rel^=stylesheet]"))
			readStylesheet($this, dir, files);
		});
	}
	
function descriptorName(filepath, ext)
	{
	ext = ext || path.extname(filepath);
	return path.basename(filepath, ext);
	}

var scanFile = function scanFile(filepath)
	{
	filepath = fs.realpathSync(filepath);
	var descriptor = undefined;
	
	if (fs.existsSync(filepath))
		{
		var filename = descriptorName(filepath, ".html");
		descriptor = getDescriptor();
		descriptor.name = filename;
		
		read(filepath, descriptor);
		}
	
	return generateGruntTask(descriptor);
	}

exports.scan = function scan(files)
	{
	if (!Array.isArray(files))
		files = [files];
		
	var map = files.map(scanFile);
	var task = {};
	task.uglify = {};
	task.concat = {};
	task.imports = {};
	task.less = {};
	
	map.forEach(function(t)
		{
		extend(task.uglify, t.uglify);
		extend(task.concat, t.concat);
		extend(task.imports, t.imports);
		extend(task.less, t.less);
		});
		
	return task;
	}
	
exports.standalone = function standalone(files)
	{
	var standalone = {};
	
	var dir = fs.realpathSync('../html5/dist');
	
	if (!Array.isArray(files))
		files = [files];
		
	files.forEach(function(file)
		{
		var name = descriptorName(file);
		var descriptor = name + "-standalone";
		standalone[descriptor] = {
			'src' : [file],
			'dest' : dir + path.sep + name + "-prod.min.js"
		};
		});
		
	return standalone;
	}
