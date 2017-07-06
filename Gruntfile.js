module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [
                    'public/controllers/*.js', 'public/routes.js','public/services/DataServices.js'],
                tasks: ['build'],
                options: {
                    spawn:false,
                    event:['all']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'public/min-safe/js/factory.js': ['public/services/*.js'],
                    'public/min-safe/js/controller.js': ['public/controllers/*.js'],
                    'public/min-safe/app.js': ['public/routes.js']
                }
            }
        },
        concat: {
            js: { //target
                src: ['public/min-safe/js/*.js','public/min-safe/app.js'],
                dest: 'public/min/app.js'
            }
        },
        uglify:{
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'public/dist/js/magic.min.js': ['public/min/app.js']
                }
            }
        },
        jshint:{
            options:{
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },
            build: [
                'public/*.js',
                'public/controllers/*.js',
                'public/services/*.js'
            ]

        }
        // cssmin: {
        //     options: {
        //         banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        //     },
        //     build: {
        //         files: {
        //             'public/dist/css/style.min.css': ['public/css/style.css','public/views/**/*.css','public/views/**/**/*.css','public/views/**/**/**/*.css']
        //         }
        //     }
        // }

    });


    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['ngAnnotate','concat','uglify']);

};