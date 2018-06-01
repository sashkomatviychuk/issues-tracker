const { assert, expect } = require('chai');
const sinon = require('sinon');

const IssuesStatsHelper = require('./../../../../../app/services/issues/helpers/issuesStatsHelper');

describe('IssuesStatsHelper Test', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('helper is defined', () => assert.isDefined(IssuesStatsHelper));

    describe('IssuesStatsHelper.getPreparedStats', () => {
        it('is a function', () => {
            assert(IssuesStatsHelper.getPreparedStats instanceof Function);
        });

        it('should return empty array if input data is undefined', () => {
            const result = IssuesStatsHelper.getPreparedStats();
            const expectedResult = [];

            expect(result).to.deep.equal(expectedResult);
        });

        it('should return empty array if input data is null', () => {
            const result = IssuesStatsHelper.getPreparedStats(null);
            const expectedResult = [];

            expect(result).to.deep.equal(expectedResult);
        });

        it('should return empty array if input data is empty array', () => {
            const result = IssuesStatsHelper.getPreparedStats([]);
            const expectedResult = [];

            expect(result).to.deep.equal(expectedResult);
        });

        it('should return empty array if elements of data have not valid fields', () => {
            const data = [
                {
                    k1: 123,
                    val: 'abc',
                },
                {
                    k2: 333,
                    val2: 'ab222',
                },
            ];

            const result = IssuesStatsHelper.getPreparedStats(data);
            const expectedResult = [];

            expect(result).to.deep.equal(expectedResult);
        });

        it('should return correct result, if input data contains all statuses stats', () => {
            const data = [
                {
                    status: 'open',
                    count: 10,
                },
                {
                    status: 'pending',
                    count: 5,
                },
                {
                    status: 'closed',
                    count: 5,
                },
            ];

            const result = IssuesStatsHelper.getPreparedStats(data);
            // percentage representation of data 'count' values
            const expectedResult = [
                {
                    status: 'open',
                    count: 50,
                },
                {
                    status: 'pending',
                    count: 25,
                },
                {
                    status: 'closed',
                    count: 25,
                },
            ];

            expect(result).to.deep.equal(expectedResult);
        });

        it('should return correct result, if input data contains one status', () => {
            const data = [
                {
                    status: 'open',
                    count: 17,
                },
            ];

            const result = IssuesStatsHelper.getPreparedStats(data);
            // percentage representation of data 'count' values
            const expectedResult = [
                {
                    status: 'open',
                    count: 100,
                },
            ];

            expect(result).to.deep.equal(expectedResult);
        });
    });
});