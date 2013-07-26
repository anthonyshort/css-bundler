# css-bundler

Bundle a CSS file and all of its assets into a single directory. This means you don't
have to worry about file paths.

## Installation

    npm install -g css-bundler

## Command Line

    css-bundler {input} {output}

## Grunt

Load the tasks

    grunt.loadNpmTasks('css-bundler')

Set the config for the task (as a multi-task)

    cssbundle: {
      all: {
        files: {
          src: ['path/to/file.css'],
          dest: '/build'
        }
      }
    }

Or simplify it using the standard Grunt file API

    cssbundle: {
      all: ['path/to/file.css']
    }

## Programmatically

    var Bundler = require('css-bundler');
    var bundle = new Bundler();

    bundle.build('path/to/file.css', 'path/to/output', function(){
      // Callback
    });