/// <amd-dependency path="image!Controls/Address/home.png" />
declare var require: (moduleId: string) => any;
var image = require("image!Controls/Address/home.png");

class Address {
    public street: string;
    public city: string;
    public state: string;
    public zip: number;
    public url: string;
    constructor(params: Address) {  
        this.street = params.street;
        this.city = params.city;
        this.state = params.state;
        this.zip = params.zip;
        this.url = image.currentSrc;
    }

}
export = Address;
