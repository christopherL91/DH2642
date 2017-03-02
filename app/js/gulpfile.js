var gulp = require('gulp');

/**
 * Configuration
 */

var buildFolder = 'dist';
var buildTarget = 'app.min.js';

var sources = {
    js: ['config/app.module.js', 'src/**/*.js'],
    config: ['gulpfile.js']
};

/**
 * Task definitions
 */
gulp.task('default', ['lint', 'build']);

gulp.task('lint', function () {
    'use strict';
    var jshint = require('gulp-jshint');

    return gulp.src(sources.js
            .concat(sources.config))
});

gulp.task('build', function () {
    'use strict';
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src(sources.js)
        .pipe(sourcemaps.init())
            .pipe(concat(buildTarget))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildFolder));
});

gulp.task('clean', function () {
    'use strict';
    var del = require('del');
    del(buildFolder);
});


// watch tasks
gulp.task('watch', ['default'], function () {
    'use strict';
    gulp.watch(sources.js
        .concat(sources.config), ['default']);
});
