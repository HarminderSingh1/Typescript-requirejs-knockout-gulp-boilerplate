var eventStream = require("event-stream");

function fixPathsInDTS() {
    return eventStream.map(function (file, cb) {
        var newContent = String(file.contents)
            .replace(/\"..\/Generated\//g, "\"../")
            .replace(/\"..\/3rdParty\//g, "\"../../3rdParty/");
        file.contents = new Buffer(newContent);
        cb(null, file);
    });
}

function fixPathsInJs() {
    return eventStream.map(function (file, cb) {
        var newContent = String(file.contents)
        // Referenes from with-in the client and editor project
        .replace(/\"..\/client\//ig, "\"client/")
        .replace(/\"..\/editor\//ig, "\"editor/")
         // References from with-in the web project
        .replace(/\"..\/..\/Generated\/client\//ig, "\"client/")
        .replace(/\"..\/..\/Generated\/editor\//ig, "\"editor/")
        .replace(/\"..\/3rdParty\//ig, "\"../../3rdParty/");
        file.contents = new Buffer(newContent);
        cb(null, file);
    });
}

module.exports = {
    fixPathsInDTS: fixPathsInDTS,
    fixPathsInJs: fixPathsInJs
};