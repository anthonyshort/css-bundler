var fs = require('fs');

exports.copy = function(from, to, callback) {
  var write = fs.createWriteStream(to);
  var read = fs.createReadStream(from);
  write.on('close', callback);
  write.on('error', callback);
  read.on('error', function(err){
    console.log('Skipping ' + from);
  });
  read.pipe(write);
}

exports.isAbsolute = function(url) {
  return ~url.indexOf('://') || url[0] == '/';
};

exports.isData = function(url) {
  return 0 == url.indexOf('data:');
};

exports.stripQuotes = function(str) {
  if ('"' == str[0] || "'" == str[0]) return str.slice(1, -1);
  return str;
};