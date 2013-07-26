var assert = require('assert');
var fs = require('fs');
var Bundle = require('..');

describe('CSS Bundler', function(){
  var bundle;

  beforeEach(function(){
    bundle = new Bundle();
  });

  it('should rename the URLs', function(done){
    var expected = fs.readFileSync('./test/expected/build.css').toString();
    bundle.build('./test/fixtures/input.css', './test/fixtures/build/build.css', function(err, css){
      assert.equal(expected, css);
      done();
    });
  });

  it('should copy over the images', function(done){
    bundle.build('./test/fixtures/input.css', './test/fixtures/build/build.css', function(err, css){
      var file;
      file = fs.statSync('./test/fixtures/build/6edf7858c7afecac61ee6bf5df17f196.png');
      assert.notEqual(file.size, 0);
      file = fs.statSync('./test/fixtures/build/d2b5ca33bd970f64a6301fa75ae2eb22.png');
      assert.notEqual(file.size, 0);
      done();
    });
  });

});
