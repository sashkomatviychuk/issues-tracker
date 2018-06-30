const _ = require('lodash');

const config = require('./../../../config');
const validate = require('./issueValidator');
const IssuesStatsHelper = require('./helpers/issuesStatsHelper');
const IssueStatusHelper = require('./helpers/issueStatusHelper');
const IssueValidationError = require('./issueValidationError');

class IssuesRepository {

    /**
     * Get paginated list of issues
     * @param {Number} page
     * @returns {Array<Collection>}
     */
    static async getListByPage(page) {
        const { skip, limit } = IssuesRepository.getSkipAndLimit(page);

        return await IssuesRepository.getList(skip, limit);
    }

    /**
     * Get list with skip and limit
     * @param {Number} skip
     * @param {Number} limit
     */
    static async getList(skip, limit) {
        return await Issue
            .find()
            .sort({ created_at: -1 })
            .limit(limit)
            .skip(skip)
            .lean()
            .exec();
    }

    /**
     * Create new issue
     * @param {Object} data
     */
    static async createIssue(data) {
        const { error } = validate(data);

        if (error) {
            throw new IssueValidationError(error.details[0].message);
        }

        const issue = new Issue(data);

        return await issue.save();
    }

    /**
     * Update issue
     * @param {ObjectId} id
     * @param {Object} data
     */
    static async updateIssue(id, data) {
        const { error } = validate(data);

        if (error) {
            throw new IssueValidationError(error.details[0].message);
        }

        const issue = await Issue.findOne({ _id: id }).lean().exec();

        if (!issue) {
            return 0;
        }

        const canChangeStatus = IssueStatusHelper.canChangeStatus(
            issue.status,
            data.status
        );

        if (!canChangeStatus) {
            throw new IssueValidationError(`Cannot update status ${issue.status} to ${data.status}`);
        }

        return await Issue.update({ _id: id }, { $set: data });
    }

    /**
     * Remove issue by id
     * @param {ObjectId} id
     */
    static async removeIssue(id) {
        const issue = await Issue.findOne({ _id: id }).exec();

        if (issue) {
            await issue.remove();
        }
    }

    /**
     * Get statuses stats
     * @returns {Array<Object>}
     */
    static async getStats() {
        const stats = await Issue.aggregate(
            [
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        status: '$_id',
                        count: 1,
                    },
                },
            ]
        ).exec();

        return IssuesStatsHelper.getPreparedStats(stats);
    }

    /**
     * @param {Number} page
     */
    static getSkipAndLimit(page) {
        const parsedPage = parseInt(page, 10);

        if (_.isNaN(parsedPage) || parsedPage < 1) {
            throw new Error('Not valid page value');
        }

        const { limit } = config;
        const skip = (parsedPage - 1) * limit;

        return { skip, limit };
    }
}

module.exports = IssuesRepository;
