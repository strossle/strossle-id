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
    it('Should fail too long string', function(done) {
        const tooLongString = '203023948093jsfldjlsdkjflksdjfksdfjlk203402938420938lkfjslkdjflskdjf';
        expect(strossleId.validateID(tooLongString)).to.equal(false);
        done();
    });
    it('Should pass on real id', function(done) {
        expect(strossleId.validateID(strossleId.generate())).to.equal(true);
        done()
    });
});

describe('Versioning', function () {
    it('Should verify with right version number', function(done) {
        let idVersion = 2;
        expect(strossleId.validateID(strossleId.generate(idVersion))).to.equal(true);
        done();
    });
});
