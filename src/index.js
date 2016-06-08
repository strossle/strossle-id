const RFC4122 = require('rfc4122');
const rfc4122 = new RFC4122();

const metroHash128 = require('metrohash').MetroHash128;
const crc = require('crc');

const ID_LENGTH = 38;
const VERSION_LENGTH = 4;
const CHECKSUM_LENGTH = 2;

const CURRENT_ID_VERSION = 1;
const SUPPORTED_ID_VERSIONS = [
    1,
];

function generateChecksum(payload, version) {
    const localVersion = version || CURRENT_ID_VERSION;

    // Handle different supported ID versions
    // Defaults to CURRENT_ID_VERSION if unsupported version is provided
    switch (localVersion) {
    // ID Version 1: crc8
    case 1:
        return crc.crc8(payload).toString(16);
    default:
        return generateChecksum(payload, CURRENT_ID_VERSION);
    }
}

function generateRandomHash(version) {
    const localVersion = version || CURRENT_ID_VERSION;

    // Handle different supported ID versions
    // Defaults to CURRENT_ID_VERSION if unsupported version is provided
    switch (localVersion) {
    // ID Version 1: metrohash128
    case 1:
        return metroHash128(localVersion).hash(rfc4122.v4()).toString('hex');
    default:
        return generateRandomHash(CURRENT_ID_VERSION);
    }
}

function generate(version) {
    let localVersion = parseInt(version || CURRENT_ID_VERSION, 10);
    if (SUPPORTED_ID_VERSIONS.indexOf(localVersion) === -1) {
        localVersion = CURRENT_ID_VERSION;
    }

    const versionPrefix = '0000';
    const versionAsHex = localVersion.toString(16);
    const versionAsfourBits = (versionPrefix + versionAsHex).slice(-VERSION_LENGTH);

    const hash = generateRandomHash(localVersion);

    const versionAsFourBitsAndHash = `${versionAsfourBits}${hash}`;
    const checksum = generateChecksum(versionAsFourBitsAndHash, localVersion);

    const checksumPrefix = '00';
    const paddedChecksum = (checksumPrefix + checksum).slice(-CHECKSUM_LENGTH);

    return `${versionAsFourBitsAndHash}${paddedChecksum}`;
}

function getVersion(id) {
    return parseInt(id.substr(0, VERSION_LENGTH), 16);
}

function validate(id) {
    if (id.length !== ID_LENGTH) {
        return false;
    }

    const version = getVersion(id);
    if (isNaN(version)) {
        return false;
    }

    const checksum = id.substr(-CHECKSUM_LENGTH);
    const versionAndHash = id.substr(0, id.length - CHECKSUM_LENGTH);

    return generateChecksum(versionAndHash, version) === checksum;
}


module.exports = {
    CURRENT_ID_VERSION,
    getVersion,
    generate,
    validate,
};
