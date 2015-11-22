/// <reference path="../../3rdParty/jQuery/jquery.d.ts" />
/// <reference path="../../3rdParty/Knockout/knockout.d.ts" />
/// <reference path="../../3rdParty/RequireJs/require.d.ts" />

/* Define the require JS config */
/* I couldn't figure our a way to reconcile these paths with the typescript paths */
requirejs.config({
    baseUrl: "./",
    paths: {
        ux: "./Scripts/",
        main: "./Scripts/Generated/Main/",
        client: "./Scripts/Generated/client/",
        editor: "./Scripts/Generated/editor/",
        jquery: "//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min",
        knockout: "//ajax.aspnetcdn.com/ajax/knockout/knockout-3.3.0.debug",
        text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
        image: '//cdnjs.cloudflare.com/ajax/libs/requirejs-plugins/1.0.3/image'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        knockout: {
            exports: 'ko'
        }
    }
});

// Bootstrap the application
requirejs(["main/webux", "knockout", "main/kocomponentregistery"], function (ux, ko) {
    console.log("bootstrapper loaded.");
    ko.applyBindings();
});
