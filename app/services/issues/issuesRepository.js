const config = require('./../../../config');

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
        return await Issue.aggregate(
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
    }

    /**
     * @param {Number} page
     */
    static getSkipAndLimit(page) {
        const { limit } = config;
        const skip = (page - 1) * limit;

        return { skip, limit };
    }
}

module.exports = IssuesRepository;
