module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      dev: ['app/app.js',
        'app/services/**/*.js',
        'app/controllers/**/*.js'
      ]
    },
    copy: {
      bootstrap: {
        expand: true,
        src: ['./fonts/**', './css/**'],
        cwd: 'bower_components/bootstrap/dist/',
        dest: 'public/'
      },
      ngtemplates: {
        expand: true,
        src: ['./templates/**'],
        cwd: 'app/',
        dest: 'public/'
      }
    },
    concat: {
      dev: {
        src: [
          'bower_components/jquery/jquery.js',
          'bower_components/underscore/underscore.js',
          'bower_components/async/lib/async.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-growl/build/angular-growl.js',
          'bower_components/pouchdb/dist/pouchdb-nightly.js',
          
          'app/app.js',
          'app/services/**/*.js',
          'app/controllers/**/*.js'
        ],
        dest: 'public/bundle.js'
      }
    },
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    watch: {
      karma: {
        files: ['app/**/*.js', 'test/**/*.js'],
        tasks: ['karma:unit:run'] //NOTE the :run flag
      },
      express: {
        files:  [ 'index.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false // Without this option specified express won't be reloaded
        }
      },
      dev: {
        files: ['app/app.js',
          'app/services/**/*.js',
          'app/controllers/**/*.js'
        ],
        tasks: ['jshint', 'concat']
      },
      ngtemplates: {
        files: [
          'app/templates/**/*.js'
        ],
        tasks: ['copy:ngtemplates']
        
      }
    },
    karma: {
      options: {
        frameworks: ['jasmine'],
        files: [
          'public/bundle.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'test/controllers/**/*.js'
        ]
      },
      continuous: {
        singleRun: true,
        browsers: ['Chrome']
      },
      unit: {
        background: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'concat', 'copy']);
  grunt.registerTask('server', ['copy', 'express:dev', 'watch']);
}