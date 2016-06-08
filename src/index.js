const RFC4122 = require('rfc4122');
const rfc4122 = new RFC4122();

const metroHash128 = require('metrohash').MetroHash128;
const crc = require('crc');

const CURRENT_ID_VERSION = 1;
const ID_LENGTH = 38;

function generateChecksum(payload, version) {
    const localVersion = version || CURRENT_ID_VERSION;
    let localChecksum = 'FF';

    switch (localVersion) {
    case 1:
        localChecksum = crc.crc8(payload).toString(16);
        break;
    default:
        break;
    }

    return localChecksum;
}

function generateRandomHash(version) {
    const localVersion = version || CURRENT_ID_VERSION;
    let localHash = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

    switch (localVersion) {
    case 1:
        localHash = metroHash128(localVersion).hash(rfc4122.v4()).toString('hex');
        break;
    default:
        break;
    }

    return localHash;
}

function generate(version) {
    const versionPrefix = '0000';
    const versionAsHex = (version || CURRENT_ID_VERSION).toString(16);
    const versionAsfourBits = (versionPrefix + versionAsHex).slice(-4);

    const hash = generateRandomHash(version);

    const versionAsFourBitsAndHash = `${versionAsfourBits}${hash}`;
    const checksum = generateChecksum(versionAsFourBitsAndHash, version);
    return `${versionAsFourBitsAndHash}${checksum}`;
}

function validateID(id) {
    if (id.length !== ID_LENGTH) {
        return false;
    }

    const version = parseInt(id.substr(0, 4), 16);
    const checksum = id.substr(-2);

    const idAndHash = id.substr(0, id.length - 2);
    return generateChecksum(idAndHash, version) === checksum;
}

module.exports = {
    generate,
    validateID,
};
