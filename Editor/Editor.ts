/// <reference path="../3rdParty/JQuery/jquery.d.ts" />
/// <reference path="../Generated/client/Client.d.ts" />

import DLC = require("../Generated/client/Client");
import logger = require("../editor/Utils/Logger");
import $ = require("jquery");

export interface CallbackCollection {
    [index: string]: Array<(a: string) => void>;
}

export class Editor {
    public id: number;
    private client: DLC.Client;
    private element: JQuery;
    private span: JQuery;
    private button: JQuery;
    private handlers: CallbackCollection = {};

    constructor(client: DLC.Client, parentElement: JQuery) {
        this.client = client;
        
        this.element = parentElement;

        this.span = $("<span>");
        this.button = $("<input>").attr({ type : "submit", value : "click for dynamic load" });
        (new logger.ConsoleLogger()).Log();
        this.button.click(() => {
            (<any>window).require(["../editor/Utils/Logger"], (log) => {
                (new log.ConsoleLogger()).Log();
            });
        });

        this.element.append(this.span).append($("<br/>"));
        this.element.append(this.button); 
    }

    public refresh(): void {
        (Math.random()) * 100;
        var message = this.client.getMessage(Math.round(Math.random() * 100));
        this.span.html("Experiment Editor received message. id: " + message.id +
            ", message: " + message.message +
            ", time: " + message.time);
        this.triggerEvent("refresh", []);
    }

    public on(evt: string, handler: (val: string) => void) {
        this.handlers[evt] = handler[evt] || [];
        this.handlers[evt].push(handler);
    }

    private triggerEvent(name: string, args: string[]) : void {
        var handlers = this.handlers[name];
        if (args) {
            args.unshift(name);
        }
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].apply(this, args);
            }
        }
    }
}