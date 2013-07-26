# css-bundler

Bundle a CSS file and all of its assets into a single directory. This means you don't
have to worry about file paths.

## Installation

    npm install -g css-bundler

## Command Line

    css-bundler {input} {output}

## Usage

    var Bundler = require('css-bundler');
    var bundle = new Bundler();

    bundle.build('path/to/file.css', 'path/to/output', function(){
      // Callback
    });