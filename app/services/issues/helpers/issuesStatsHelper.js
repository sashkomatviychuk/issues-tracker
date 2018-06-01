const _ = require('lodash');

class IssuesStatsHelper {

    /**
     * Percentage representation of issues count grouped by status
     * @param {Array<Object>} data
     * @returns {Array<Object>}
     */
    static getPreparedStats(data) {
        const clonedData = _.cloneDeep(data);
        const total = _.sumBy(data, 'count');
        const lastIndex = clonedData.length - 1;
        const maxPercent = 100;

        if (total === 0) {
            return clonedData;
        }

        return clonedData.reduce((prev, item, i) => {
            if (i === lastIndex) {
                const sumPrev = _.sumBy(prev, 'count');

                prev.push({
                    status: item.status,
                    count: (maxPercent - sumPrev),
                });
            } else {
                prev.push({
                    status: item.status,
                    count: Math.ceil(100 * (item.count / total)),
                });
            }
            return prev;
        }, []);
    }
}

module.exports = IssuesStatsHelper;
