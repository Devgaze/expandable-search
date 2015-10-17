'use strict';
module.exports = function(grunt){

  // load tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    App: {
      distPath: 'dist',
      devPath: 'src'
    },


    // Autoprefixer - adds vendor prefixes to CSS
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      dev: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },


    // Clean - Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= App.distPath %>/{,*/}*',
            '!<%= App.distPath %>/.git{,*/}*'
          ]
        }]
      },
      dev: '.tmp/'
    },


    // Compass - Compile Sass to CSS
    compass: { 
      options: {
        sassDir: '<%= App.devPath %>/sass',
        cssDir: '.tmp/css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= App.devPath %>/images',
        javascriptsDir: '<%= App.devPath %>/scripts',
        fontsDir: '<%= App.devPath %>/fonts',
        // importPath: './vendor',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },                 
      dist: {                   
        options: {              
          generatedImagesDir: '<%= App.distPath %>/images/generated',
          environment: 'production'
        }
      },
      dev: {                    
        options: {
          sourcemap: true
        }
      }
    },


    // Connect - Start a connect web server
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '127.0.0.1',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            // grunt.log.write(JSON.stringify(options));
            // grunt.log.write('-----------------------------');

            return [

              connect.static('.tmp'),
              // connect().use(
              //   '/vendor',
              //   connect.static('./vendor')
              // ),
              connect().use(
                '/src/sass',
                connect.static('./src/sass')
              ),
              connect.static('<%= App.devPath %>'),
              connect.static('src')
              // connect.static(options.base[0]),
              // connect.directory(options.base[0])
            ];
          },
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect.static('<%= App.devPath %>')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= App.distPath %>'
        }
      }
    },


    // Copy - Copy files and folders
    copy: {
      dist: {
        files: [
        {
          expand: true,
          dot: true,
          cwd: '<%= App.devPath %>',
          dest: '<%= App.distPath %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'images/{,*/}*.{webp}',
            'fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= App.distPath %>/images',
          src: ['generated/*']
        }]
      }
    },

    
    // Imagemin - minify images
    imagemin: {  
      dist: {    
        files: [{
          expand: true, 
          cwd: '<%= App.devPath %>/images', 
          src: ['**/*.{png,jpg,jpeg,gif}'], 
          dest: '<%= App.distPath %>/images'
        }]
      }
    },


    // JShint - Validate files with JSHint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= App.devPath %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'//,
        // singleRun: true
      }
    },


    // Watch - Run predefined tasks whenever watched file patterns are added, changed or deleted.
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:all'],
      },
      js: {
        files: ['<%= App.devPath %>/scripts/{,*/}*.js'],
        tasks: ['jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= App.devPath %>/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev', 'autoprefixer']
      },
      jsTest: {
        files: ['test/{,*/}*.js'],
        tasks: ['jshint:test', 'karma']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= App.devPath %>/**/{,*/}*.html',
          '.tmp/css/{,*/}*.css',
          '<%= App.devPath %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Automatically inject Bower components into the app
    // wiredep: {
    //   app: {
    //     src: ['<%= App.devPath %>/index.html'],
    //     ignorePath:  /\.\.\//
    //   },
    //   test: {
    //     devDependencies: true,
    //     src: '<%= karma.unit.configFile %>',
    //     ignorePath:  /\.\.\//,
    //     fileTypes:{
    //       js: {
    //         block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
    //           detect: {
    //             js: /'(.*\.js)'/gi
    //           },
    //           replace: {
    //             js: '\'{{filePath}}\','
    //           }
    //         }
    //       }
    //   },
    //   sass: {
    //     src: ['<%= App.devPath %>/styles/{,*/}*.{scss,sass}'],
    //     ignorePath: /(\.\.\/){1,2}bower_components\//
    //   }
    // },
    
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= App.devPath %>/index.html',
      options: {
        dest: '<%= App.distPath %>/',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },


    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= App.distPath %>/{,*/}*.html'],
      css: ['<%= App.distPath %>/css/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= App.distPath %>',
          '<%= App.distPath %>/images',
          '<%= App.distPath %>/css'
        ]
      }
    }

    // CSSMin - Minify CSS
    // cssmin: {
    //   options: {
    //     shorthandCompacting: false,
    //     roundingPrecision: -1
    //   },
    //   target: {
    //     files: {
    //       'output.css': ['foo.css', 'bar.css']
    //     }
    //   }
    // },

    // Uglify - 
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    //       '<%= grunt.template.today("yyyy-mm-dd") %> */'
    //   },
    //   my_target: {
    //     files: {
    //       'dest/output.min.js': ['src/input.js']
    //     }
    //   }
    // }

    
  });

  // Register development task called `serve`
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:dev',
      'compass:dev',
      'autoprefixer:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  // Register building task called `build`
  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'imagemin:dist',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'usemin'
    ]);

  // Register test task called `test`
  grunt.registerTask('test', [
      'clean:dev',
      'autoprefixer',
      'connect:test',
      'karma'
    ]);

};