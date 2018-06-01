class IssueValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "IssueValidationError";
        Object.setPrototypeOf(this, IssueValidationError.prototype);
    }
}

module.exports = IssueValidationError;
