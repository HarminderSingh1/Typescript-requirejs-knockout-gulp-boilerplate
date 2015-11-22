var gulp = require('gulp');
var typescript = require('gulp-typescript');
var eventStream = require("event-stream");
var sequencer = require("run-sequence");
var debug = require("gulp-debug");
var print = require('gulp-print');
var rjs = require('gulp-requirejs');


var client = require("./client/gulpfile.js");
var editor = require("./editor/gulpfile.js");
var web = require("./web/gulpfile.js");
var commonBuildTasks = require("./CommonBuildTasks");


gulp.task("compileClient", function () {
    return client.compile();
});

gulp.task("compileEditor", function () {
    return editor.compile();
});

gulp.task("compileWeb", function () {
    return web.compile();
});

gulp.task("rjs", function (cb) {
    return web.rjsOptimize(cb);
});

gulp.task("copyScripts", function () {
    return gulp.src("./Generated/**/*.js")
           .pipe(debug())
           .pipe(commonBuildTasks.fixPathsInJs())
           .pipe(gulp.dest("./web/Scripts/Generated/"));
});

gulp.task('default', function () {
    sequencer("compileClient", "compileEditor", "compileWeb", "copyScripts");
});

gulp.task('release', ['default'], function () {
    sequencer('default', 'rjs');
});
