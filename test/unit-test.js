const chai = require('chai');
const expect = chai.expect;

const strossleId = require('../src/index.js');

describe('Generating', function () {

    it('Should return one to many unique IDs', function (done) {

        const uniqueArray = [];
        const howManyTimesToRun = 1000;
        for(let i = 0; i < howManyTimesToRun; i++) {
            const generatedId = strossleId.generate();
            expect(uniqueArray.indexOf(generatedId)).to.equal(-1);
            uniqueArray.push(generatedId);
        }
        expect(uniqueArray.length).to.equal(howManyTimesToRun);
        done();

    });

    it('Should consists of 38 characters', function (done) {
        expect(strossleId.generate().length).to.equal(38);
        done();
    });

});

describe('Validating', function () {
    it('Should fail wrong length strings', function(done) {
        const tooLongString = '203023948093jsfldjlsdkjflksdjfksdfjlk203402938420938lkfjslkdjflskdjf';
        expect(strossleId.validate(tooLongString)).to.equal(false);

        const tooShortString = '1234';
        expect(strossleId.validate(tooShortString)).to.equal(false);

        done();
    });
    it('Should pass on real id', function(done) {
        expect(strossleId.validate(strossleId.generate())).to.equal(true);
        done()
    });
    it('Should fail on fake id', function(done) {
        let ID = strossleId.generate();
        let fakeID = `XXXX${ID.substr(4, ID.length-4)}`;

        expect(strossleId.validate(fakeID)).to.equal(false);
        done()
    });
});

describe('Versioning', function () {
    it('Should default to current version if unsupported version is supplied', function(done) {
        let idVersion = 1.42;
        let ID = strossleId.generate(idVersion);
        expect(strossleId.getVersion(ID)).to.equal(strossleId.CURRENT_ID_VERSION);
        expect(strossleId.validate(ID)).to.equal(true);
        done();
    });
});
