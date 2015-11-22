import protocol = require("../Client/Protocol/ClientProtocol");

export class Client {
    private messageId: number;
    private clientId: string;
    constructor(public url: string) {
        this.messageId = 0;
        this.clientId = "Sample client Id";
    }
    public getMessage(msgNumber: number): protocol.Message{
        return {
            id: this.messageId++,
            clientId: this.clientId,
            message: "My message " + msgNumber,
            time: (new Date()).toString()
        };
    }
}