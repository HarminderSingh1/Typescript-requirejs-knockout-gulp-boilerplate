var gulp = require('gulp');
var typescript = require('gulp-typescript');
var eventStream = require("event-stream");
var debug = require("gulp-debug");

var commonBuildTasks = require("../CommonBuildTasks");

var client = "./client/";
var clientScripts = [
    client + "**/*.ts"
];
var clientOutputDirectory = "./generated/client/";

var clientTsProject = typescript.createProject({
    declarationFiles: true,
    sortedOutput: true,
    module: "amd"
});

function compileTypeScript() {
    var tsResult = gulp.src(clientScripts)
        .pipe(typescript(clientTsProject,
        undefined,
        typescript.reporter.fullReporter(true)));

    return eventStream.merge(
        tsResult.dts
         .pipe(debug())
        .pipe(commonBuildTasks.fixPathsInDTS())
        .pipe(gulp.dest(clientOutputDirectory)),
        tsResult.js
        .pipe(gulp.dest(clientOutputDirectory))
    );
}

module.exports = {
    compile: compileTypeScript
};