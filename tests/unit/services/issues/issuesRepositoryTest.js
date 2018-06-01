const { assert, expect } = require('chai');
const sinon = require('sinon');

const config = require('./../../../../config');
const IssueValidator = require('./../../../../app/services/issues/issueValidator');
const IssueValidationError = require('./../../../../app/services/issues/issueValidationError');
const IssuesStatsHelper = require('./../../../../app/services/issues/helpers/issuesStatsHelper');
const IssueStatusHelper = require('./../../../../app/services/issues/helpers/issueStatusHelper');
const IssuesRepository = require('./../../../../app/services/issues/issuesRepository');

describe('IssuesRepository Test', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('class is defined', () => assert.isDefined(IssuesRepository));

    describe('class has required methods', () => {
        it('IssuesRepository.getListByPage is a function', () => {
            assert(IssuesRepository.getListByPage instanceof Function);
        });

        it('IssuesRepository.getList is a function', () => {
            assert(IssuesRepository.getList instanceof Function);
        });

        it('IssuesRepository.createIssue is a function', () => {
            assert(IssuesRepository.createIssue instanceof Function);
        });

        it('IssuesRepository.updateIssue is a function', () => {
            assert(IssuesRepository.updateIssue instanceof Function);
        });

        it('IssuesRepository.removeIssue is a function', () => {
            assert(IssuesRepository.removeIssue instanceof Function);
        });

        it('IssuesRepository.getStats is a function', () => {
            assert(IssuesRepository.getStats instanceof Function);
        });

        it('IssuesRepository.getSkipAndLimit is a function', () => {
            assert(IssuesRepository.getSkipAndLimit instanceof Function);
        });
    });

    describe('method IssuesRepository.getSkipAndLimit', () => {
        it('should return correct result', () => {
            const page = 1;
            const expectedLimit = config.limit;
            const expectedSkip = (page - 1) * expectedLimit;

            const { skip, limit } =  IssuesRepository.getSkipAndLimit(page);

            expect(skip).to.equal(expectedSkip);
            expect(limit).to.equal(expectedLimit);
        });

        it('should an error if page not valid', () => {
            const page = 'page';
            const fn = () => IssuesRepository.getSkipAndLimit(page);

            expect(fn).to.throw(Error);
        });
    });
});