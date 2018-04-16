import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// import Chance from 'chance';

chai.use(sinonChai);

const expect = chai.expect;
// const chance = new Chance();

describe('index tests', () => {
    let sandbox,
        actualError;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when handling', () => {
        beforeEach((done) => {
            done();
        });

        it('should not raise an error', () => {
            expect(actualError).to.equal(undefined);
        });
    });
});
