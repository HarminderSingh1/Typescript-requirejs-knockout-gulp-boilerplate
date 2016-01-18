/// <reference path="../../3rdParty/JQuery/jquery.d.ts" />
/// <reference path="../../3rdParty/Knockout/knockout.d.ts" />

import EE = require("../../Generated/editor/Editor");
import CL = require("../../Generated/client/Client");
import Protocol = require("../../Generated/client/Protocol/ClientProtocol");
import $ = require("jquery");

// WebUx is the main application
export class WebUx {
    element: JQuery;
    span: HTMLElement;
    timerToken: number;

    editor: EE.Editor;
    client: CL.Client;

    constructor(element: JQuery) {
        this.element = element;
        this.client = new CL.Client("http://testclient.com");
        this.editor = new EE.Editor(this.client, this.element);
    }

    getMessage(): Protocol.Message{
        return this.client.getMessage(1);    
    }
    
    start() {
        this.editor.on("refresh", function (...params: string[]) {
            console.log("Editor refreshed");
        });

        this.timerToken = setInterval(() => {
            this.editor.refresh();
        }, 100);        
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}
