var gulp = require('gulp');
var typescript = require('gulp-typescript');
var eventStream = require("event-stream");
var debug = require("gulp-debug");

var commonBuildTasks = require("../CommonBuildTasks");

var editor = "./editor/";
var editorScripts = [
    editor + '**/*.ts',
];
var editorOutputDirectory = "./generated/editor/";;

var editorTsProject = typescript.createProject({
    declarationFiles: true,
    sortedOutput: true,
    module: "amd"
});

function compileTypeScript() {
    var tsResult = gulp.src(editorScripts)
        .pipe(typescript(editorTsProject,
        undefined,
        typescript.reporter.fullReporter(true)));

    return eventStream.merge(
        tsResult.dts
        .pipe(debug())
        .pipe(commonBuildTasks.fixPathsInDTS())
        .pipe(gulp.dest(editorOutputDirectory)),
        tsResult.js
        .pipe(gulp.dest(editorOutputDirectory))
    );
}

module.exports = {
    compile: compileTypeScript
};