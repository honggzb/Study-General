##  List all files in a directory recursively

```javascript
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

walkDir('my-dir', function(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  console.log(filePath, fileContents);
});
```

- [NodeJS Walk Directory](https://medium.com/@allenhwkim/nodejs-walk-directory-f30a2d8f038f)
- https://gist.github.com/kethinov/6658166

```javascript
// List all files [as directory tree] in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist.push(walkSync(dir + '/' + file, []));
        }
        else { filelist.push(file); }
    });
    return filelist;
};
```

**In webpack.config.js, it need change to object in entry**

```javascript
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach( function(f) {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ?
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function getEntries(){
  var files = [];
  //console.log(path.resolve(__dirname, 'app/modules/'));
  walkDir(path.resolve(__dirname, 'app/modules/'), function(filePath) {
    files.push(filePath);
  });
  return files.filter(function(file) {
      //console.log(file);
      return file.match(/.*\.js$/); }
  );
}

entry:
    Object.assign({}, getEntries().reduce((obj, val) => {
          const filenameRegex = /([\w\d_-]*)\.?[^\\\/]*$/i;
          obj[val.match(filenameRegex)[1]] = val;
          return obj;
        },
    {}),
    {
      polyfills: './app/polyfills.js',
      vendor: './app/vendor.js',
      main: './.tmp/app/app.js'
    }
  ),
output: {
    path: helpers.root('dist/dev'),
    filename: '[name].[hash:5].js'
}
```

