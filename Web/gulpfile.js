var gulp = require('gulp');
var typescript = require('gulp-typescript');
var eventStream = require("event-stream");
var debug = require("gulp-debug");
var rjs = require('gulp-requirejs');
var fs = require("fs");

var commonBuildTasks = require("../CommonBuildTasks");

var web = './web/';
var scripts = [
    web + 'Scripts/**/*.ts',
    !web + 'Scripts/Generated/**/*.ts'
];
var webOutput = web + "Scripts/Generated/main/";

var webTsProject = typescript.createProject({
    declarationFiles: true,
    sortedOutput: true,
    module: "amd"
});

function compileTypeScript() {
    var tsResult = gulp.src(scripts)
        .pipe(typescript(webTsProject,
        undefined,
        typescript.reporter.fullReporter(true)));

    return eventStream.merge(
        tsResult.js
        .pipe(debug())
        .pipe(commonBuildTasks.fixPathsInJs())
        .pipe(gulp.dest(webOutput))
    );
}

function requireJsWrapper(options) {
    // rjs doesn't play nicely with gulp - the success callback on the returned stream is not called
    // and the task callback gets called too soon when the optimized file is not yet ready.
    // This function provides a work around - delete the output file and then poll for the output file
    // to exist before calling the task callback.
    fs.unlink(options.outputFileName, function (err) {
        // NO OP;
    });
    var TwoHundredMs = 200;
    var iterationCount = 30 * 1000 / TwoHundredMs; // 30 seconds
    var result = rjs(options.rjsOptions)
        //.pipe(uglify())
        .pipe(gulp.dest(options.outputDirectory));
    var count = 0;
    var interval = setInterval(function () {
        fs.stat(options.outputFileName, function (err, fd) {
            if (!err || err.code !== "ENOENT") {
                // Has the optimized file for requirejs modules
                clearInterval(interval);
                options.callback();
            };
            if (++count > iterationCount) {
                gutil.log("Failed to optimize requireJs Files. " + JSON.stringify(options));
                process.exit(1);
            }
        });
    },
        TwoHundredMs);
    return result;
}
function rjsOptimize(cb) {
    var outFileName = "web_release.js";
    var baseUrl = "./web/"
    return requireJsWrapper({
        outputDirectory: webOutput,
        outputFileName: webOutput + outFileName,
        rjsOptions: {
            baseUrl: baseUrl,
            name: "main/webux",
            mainConfigFile: baseUrl + "scripts/generated/Main/config.js",
            //include: ["home/homepage"], /* Explicitly add this file because this file is required dynamically. */
            out: outFileName
        },
        callback: cb
    });
}

module.exports = {
    compile: compileTypeScript,
    rjsOptimize: rjsOptimize
};