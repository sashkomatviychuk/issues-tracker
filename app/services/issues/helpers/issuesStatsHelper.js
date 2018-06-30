const _ = require('lodash');

const sortOrder = {
    open: 0,
    pending: 1,
    closed: 2,
};

class IssuesStatsHelper {

    /**
     * Percentage representation of issues count grouped by status
     * @param {Array<Object>} data
     * @returns {Array<Object>}
     */
    static getPreparedStats(data) {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        const clonedData = _.cloneDeep(data);
        const total = _.sumBy(data, 'count');
        const lastIndex = clonedData.length - 1;
        const maxPercent = 100;

        if (total === 0) {
            return clonedData;
        }

        return clonedData.reduce((prev, item, i) => {
            if (!_.has(item, 'count') || !_.has(item, 'status')) {
                return prev;
            }

            if (i === lastIndex) {
                const sumPrev = _.sumBy(prev, 'count');

                prev.push({
                    status: item.status,
                    count: (maxPercent - sumPrev),
                });
            } else {
                const count = parseInt(item.count, 10) || 0;

                prev.push({
                    status: item.status,
                    count: Math.ceil(100 * (count / total)),
                });
            }

            return prev;
        }, [])
            .sort((a, b) => {
                const statusA = sortOrder[a.status];
                const statusB = sortOrder[b.status];

                return statusA - statusB;
            });
    }
}

module.exports = IssuesStatsHelper;
