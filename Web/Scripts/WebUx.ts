/// <reference path="../../3rdParty/JQuery/jquery.d.ts" />
/// <reference path="../../3rdParty/Knockout/knockout.d.ts" />

import EE = require("../../Generated/editor/Editor");
import DLC = require("../../Generated/client/Client");
import $ = require("jquery");

// WebUx is the main application
export class WebUx {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    editor: EE.Editor;
    client: DLC.Client;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    start() {

        this.client = new DLC.Client("http://testclient.com");
        this.editor = new EE.Editor(this.client, $("#editor"));
        this.editor.on("refresh", function (...params: string[]) {
            console.log("Editor refreshed");
        });

        this.timerToken = setInterval(() => {
            this.editor.refresh();
        }, 500);        
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

// Bootstraper
function BootStrap() {
    var el: HTMLElement = $("#content").get(0);
    (new WebUx(el)).start();
}
BootStrap();