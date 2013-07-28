# css-bundler

Bundle a CSS file and all of its assets into a single directory. This means you don't
have to worry about file paths. If you separate you CSS into components, you might 
run into this problem. You don't want to have to worry about dozens of component 
folders and paths.

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

## Example

Let's say you have a CSS file called `index.css`:

    .foo {
        background: url('path/to/image.png');
    }

With the image in the relative directory. You can bundle this into
a new directory and file with all of the assets:

    css-bundler index.css build/build.css

This will create a `build.css` file in the `build` directory relative
to the current directory. It will rewrite the paths:

    .foo {
        background: url('6edf7858c7afecac61ee6bf5df17f196.png');
    }

And it will copy the image to the build directory.
