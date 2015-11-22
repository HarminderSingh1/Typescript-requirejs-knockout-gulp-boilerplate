/// <reference path="../3rdParty/JQuery/jquery.d.ts" />
/// <reference path="../Generated/client/Client.d.ts" />
import DLC = require("../Generated/client/Client");
export interface CallbackCollection {
    [index: string]: Array<(a: string) => void>;
}
export declare class Editor {
    id: number;
    private client;
    private element;
    private span;
    private button;
    private handlers;
    constructor(client: DLC.Client, parentElement: JQuery);
    refresh(): void;
    on(evt: string, handler: (val: string) => void): void;
    private triggerEvent(name, args);
}
