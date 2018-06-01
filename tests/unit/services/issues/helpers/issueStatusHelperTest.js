const { assert, expect } = require('chai');
const sinon = require('sinon');

const IssueStatusHelper = require('./../../../../../app/services/issues/helpers/issueStatusHelper');
const IssueValidationError = require('./../../../../../app/services/issues/issueValidationError');

describe('IssueStatusHelper Test', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('helper is defined', () => assert.isDefined(IssueStatusHelper));

    describe('IssueStatusHelper.getStatusesPriorities', () => {
        it('is a function', () => {
            assert(IssueStatusHelper.getStatusesPriorities instanceof Function);
        });

        it('should return correct statuses priorities', () => {
            const expectedResult = {
                open: 0,
                pending: 1,
                closed: 2,
            };

            const result = IssueStatusHelper.getStatusesPriorities();

            expect(result).to.deep.equal(expectedResult);
        });
    });

    describe('IssueStatusHelper.canChangeStatus', () => {
        it('is a function', () => {
            assert(IssueStatusHelper.canChangeStatus instanceof Function);
        });

        it('should throw an error if status name not valid', () => {
            const fn = () => IssueStatusHelper.canChangeStatus('bad1', 'not_valid');

            expect(fn).to.throw(IssueValidationError);
        });

        it('should return true if old status is open and new - pending', () => {
            const result = IssueStatusHelper.canChangeStatus('open', 'pending');

            expect(result).to.be.true;
        });

        it('should return false if old status is pending and new - open', () => {
            const result = IssueStatusHelper.canChangeStatus('pending', 'open');

            expect(result).to.be.false;
        });
    });
});