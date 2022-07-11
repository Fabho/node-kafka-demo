const crypto = require('crypto');

class Entry {
    Key="";
    Temperature = 0.0;

    constructor(temperature) {
        this.Key = crypto.randomUUID();
        this.Temperature = temperature;
    }
}

module.exports = Entry;