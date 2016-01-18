var gulp = require('gulp');
var typescript = require('gulp-typescript');
var eventStream = require("event-stream");
var debug = require("gulp-debug");

var commonBuildTasks = require("../CommonBuildTasks");

var tests = "./tests/";
var testScripts = [
    tests + '**/*.ts',
];

var testsOutputDirectory = "./tests/generated/";;
var testsTsProject = typescript.createProject({
    declarationFiles: true,
    sortedOutput: true,
    module: "amd"
});

function compileTypeScript() {
    var tsResult = gulp.src(testScripts)
        .pipe(typescript(testsTsProject,
        undefined,
        typescript.reporter.fullReporter(true)));

    return eventStream.merge(
        tsResult.dts
        .pipe(debug())
        .pipe(gulp.dest(testsOutputDirectory)),
        tsResult.js
        .pipe(gulp.dest(testsOutputDirectory))
    );
}

module.exports = {
    compile: compileTypeScript
};