var jsxgettext = require('jsxgettext');
var fs = require('fs');
var path = require('path');

var basePath = path.resolve("../../html5/locale/template/otmm-model-messages.pot");
var baseMessages = jsxgettext.load(basePath);

function map(translations, area) {
	var baseTranslations = baseMessages.translations[area];
	
	Object.keys(translations).forEach(function(key) {
		var translation = translations[key];
		var baseTranslation = baseTranslations[key];
		
		var comment = translation.comments && translation.comments.extracted;
		if (comment) {
			var translatedMessage = comment.replace(/^Original display name:/, '').trim();
			translation.msgstr = [translatedMessage];
			translation.comments = baseTranslation.comments;
		}
	});
}

process.argv.slice(2).forEach(function(fileName) {
	var messages = jsxgettext.load(path.resolve(fileName));
	
	Object.keys(messages.translations).forEach(function(area) {
		if (area) {
			var translations = messages.translations[area];
			map(translations, area);
		}
	});
	
	jsxgettext.compile(messages);
	var outputParts = fileName.split(path.sep);
	outputParts.splice(-1, 0, "altered");
	
	var outputPath = outputParts.slice(0,-1).join(path.sep);
	if (!fs.existsSync(outputPath))
		fs.mkdirSync(outputPath);
	
	console.log(outputParts.join(path.sep));
	fs.writeFileSync(outputParts.join(path.sep), jsxgettext.compile(messages));
});
