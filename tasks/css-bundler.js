var fs = require('fs');
var Batch = require('batch');
var Bundle = require('../');

module.exports = function(grunt) {
  grunt.registerMultiTask('cssbundler', function(){
    var options = this.options({});
    var batch = new Batch();
    this.files.forEach(function(file){
      file.src.forEach(function(filepath){
        batch.push(function(done){
          var bundle = new Bundle(options);
          bundle.build(filepath, file.dest, function(err){
            if(err) return grunt.log.error(err);
            done();
          });
        });
      });
    });
    batch.end(this.async());
  });
};