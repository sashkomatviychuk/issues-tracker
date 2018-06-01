const { assert, expect } = require('chai');
const sinon = require('sinon');

const IssueValidator = require('./../../../../app/services/issues/issueValidator');
const IssueValidationError = require('./../../../../app/services/issues/issueValidationError');

describe('IssueValidator Test', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('validator is defined', () => assert.isDefined(IssueValidator));

    it('validator is a function', () => assert(IssueValidator instanceof Function ));

    it('should not return error if data is valid', () => {
        const data = {
            title: 'Some issue',
            description: 'Some descr',
            status: 'open',
            priority: 'normal',
        };

        const { error } = IssueValidator(data);

        expect(error).to.be.null;
    });

    it('should return an error if title is not valid value', () => {
        const data = {
            title: '',
            description: 'Some descr',
            status: 'open',
            priority: 'normal',
        };

        const { error } = IssueValidator(data);

        expect(error.name).to.equal('ValidationError');
        expect(error.message).to.have.string('Title is required and max length 255 chars');
    });

    it('should return an error if description is not valid value', () => {
        const data = {
            title: 'someth',
            status: 'open',
            priority: 'normal',
        };

        const { error } = IssueValidator(data);

        expect(error.name).to.equal('ValidationError');
        expect(error.message).to.have.string('Description is required');
    });

    it('should return an error if status is not valid value', () => {
        const data = {
            title: 'someth',
            description: 'Some descr',
            status: 'bad_val',
            priority: 'normal',
        };

        const { error } = IssueValidator(data);

        expect(error.name).to.equal('ValidationError');
        expect(error.message).to.have.string('Status can be only open, pending or closed');
    });

    it('should return an error if priority is not valid value', () => {
        const data = {
            title: 'someth',
            description: 'Some descr',
            status: 'open',
            priority: 'some_bad_val',
        };

        const { error } = IssueValidator(data);

        expect(error.name).to.equal('ValidationError');
        expect(error.message).to.have.string('Priority can be only low, normal or high');
    });
});
