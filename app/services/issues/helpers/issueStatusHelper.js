const _ = require('lodash');
const IssueValidationError = require('./../issueValidationError');

class IssueStatusHelper {

	/**
	 * Map of statuses priorities
	 * @returns {Object<String, Number>}
	 */
	static getStatusesPriorities() {
		return {
			open: 0,
			pending: 1,
			closed: 2,
		};
	}

	/**
	 * Check is old status priority less than new
	 * @param {String} oldStatus
	 * @param {String} newStatus
	 * @returns {Boolean}
	 * @throws {IssueValidationError}
	 */
	static canChangeStatus(oldStatus, newStatus) {
		const priorities = IssueStatusHelper.getStatusesPriorities();

		if (!_.has(priorities, oldStatus) || !_.has(priorities, newStatus)) {
			throw new IssueValidationError('Not valid status value');
		}

		return priorities[oldStatus] <= priorities[newStatus];
	}
}

module.exports = IssueStatusHelper;
