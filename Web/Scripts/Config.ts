/// <reference path="../../3rdParty/jQuery/jquery.d.ts" />
/// <reference path="../../3rdParty/Knockout/knockout.d.ts" />
/// <reference path="../../3rdParty/RequireJs/require.d.ts" />

/* Define the require JS config */
requirejs.config({
    baseUrl: "./",
    paths: {
        ux: "./Scripts/",
        main: "./Scripts/Generated/Main/",
        client: "./Scripts/Generated/client/",
        editor: "./Scripts/Generated/editor/",
        jquery: "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.10.2.min",
        knockout: "http://ajax.aspnetcdn.com/ajax/knockout/knockout-3.3.0.debug",
        text: "http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
        image: 'http://cdnjs.cloudflare.com/ajax/libs/requirejs-plugins/1.0.3/image'
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
