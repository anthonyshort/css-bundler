var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var Batch = require('batch');
var mkdirp = require('mkdirp');

function copy(from, to, callback) {
  var write = fs.createWriteStream(to);
  var read = fs.createReadStream(from);
  write.on('close', callback);
  write.on('error', callback);
  read.on('error', callback);
  read.pipe(write);
}

function isAbsolute(url) {
  return ~url.indexOf('://') || url[0] == '/';
};

function isData(url) {
  return 0 == url.indexOf('data:');
};

function stripQuotes(str) {
  if ('"' == str[0] || "'" == str[0]) return str.slice(1, -1);
  return str;
};

function Bundler(options) {
  this.options = options;
}

Bundler.prototype.use = function(fn) {
  fn(this);
};

Bundler.prototype.build = function(input, dest, callback) {
  var self = this;
  var dir = path.dirname(dest);
  mkdirp(dir, function(){
    var inputDir = path.dirname(input);
    fs.readFile(input, function(err, buffer) {
      var str = buffer.toString();
      var batch = new Batch();

      var css = str.replace(/\burl\s*\(([^)]+)\)/g, function(_, url) {
        url = stripQuotes(url);
        if( isAbsolute(url) || isData(url) ) return 'url(' + url + ')';
        var filename = path.basename(url);
        var name = crypto.createHash('md5').update(url).digest("hex") + path.extname(filename);
        batch.push(function(done){
          var image = path.join(inputDir, url);
          copy(image, path.join(dir, name), done);
        });
        return 'url(' + name + ')';
      });

      batch.push(function(done){
        fs.writeFile(dest, css, done);
      });

      batch.end(function(err){
        callback(err, css);
      });
    });
  });
};

module.exports = Bundler;