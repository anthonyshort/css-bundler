# css-bundler

Bundle a CSS file and all of its assets into a single directory. This means you don't
have to worry about file paths.

## Installation

    npm install -g css-bundler

## Usage

### Command Line

    css-bundler {input} {output}

### Grunt

A grunt task is included. Load the tasks with `grunt.loadNpmTasks('css-bundler')` and add some config:

    cssbundler: {
      options: {
        prefix: 'foo/bar'
      },
      foo: {
        src: 'src/index.css',
        dest: 'build/build.css'
      }
    }

See the grunt docs on [Configuring Tasks](http://gruntjs.com/configuring-tasks#files) as it uses the
standard Grunt API.

#### Dynamic Bundles

You can create multiple bundles at once using Grunt's dynamic file mapping:

    cssbundler: {
      all: {
        files: [{
          expand: true,
          src: ['bundles/**/build.css'],
          dest: 'build',
          ext: '.bundled.css'
        }]
      }
    }

This will create multiple bundles and create a `build` directory in each one with the built bundle. This
means you don't need to manually configure each and every bundle.

### Programmatically

    var Bundler = require('css-bundler');
    var bundle = new Bundler({
      // options
    });
    bundle.build('path/to/file.css', 'path/to/output', function(){
      // Callback
    });