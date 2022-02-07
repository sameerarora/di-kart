export class Payment {

    name: String;
    type: String;
    validity: Date;

    constructor(name: String, type: String, validity: Date) {
        this.name = name;
        this.type = type;
        this.validity = validity;
    }
}