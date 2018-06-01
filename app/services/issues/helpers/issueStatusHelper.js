class IssueStatusHelper {

	static getStatusesPriorities() {
		return {
			open: 0,
			pending: 1,
			closed: 2,
		};
	}

	static canChangeStatus(oldStatus, newStatus) {
		const priorities = IssueStatusHelper.getStatusesPriorities();

		return priorities[oldStatus] <= priorities[newStatus];
	}
}

module.exports = IssueStatusHelper;
