const RFC4122 = require('rfc4122');
const MetroHash128 = require('metrohash').MetroHash128;
const crc = require('crc');
const VERSION = 1;
const IDLength = 38;

let rfc4122 = new RFC4122();

const generate = function () {

    const versionPrefix = '0000';
    const versionAsHex = VERSION.toString(16);

    const versionAsfourBits = (versionPrefix+versionAsHex).slice(-4);
    //console.log(versionAsfourBits);
    const hash = MetroHash128(VERSION).hash(rfc4122.v4()).toString('hex');
    const versionAsFourBitsAndHash = `${versionAsfourBits}${hash}`;
    const checksum = generateChecksum(versionAsFourBitsAndHash);

    return `${versionAsFourBitsAndHash}${checksum}`;
};

const validateID = function(id) {
    console.log(id);
    if(id.length === IDLength) {
        const checksum = id.substr(-2);
        const idAndHash = id.substr(0, id.length-2);
        if (generateChecksum(idAndHash) === checksum) {
           return true;
        } else {
            console.log("Wrong checksum, did Strossle generate this id, REALLY?");
            return false;
        };
    } else {
        console.log("Wrong length");
        return false;
    }
};

const generateChecksum = function (payload) {
    return crc.crc8(payload).toString(16);
};

const tempId = generate();
validateID(tempId);