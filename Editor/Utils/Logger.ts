export interface ILogger {
    Log: (...string: string[]) => void;
}

export class ConsoleLogger implements ILogger {
    public Log(...msg: string[]) {
        console.log(new Date() + " - " + msg.join(",") );
    }       
}