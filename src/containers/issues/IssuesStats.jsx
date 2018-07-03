import React from 'react'
import Progress from 'reactstrap/lib/Progress'
import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'

import { fetchStats } from './../../actions/stats'

const colorMap = {
    open: 'primary',
    pending: 'warning',
    closed: 'success',
};

class IssuesStats extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchStats());
    }

    render() {
        const stats = this.props.stats || [];

        const content = stats.map(item => <Progress
            bar
            color={colorMap[item.status]}
            value={item.count}
            key={item.status}
        >
            {item.status}
        </Progress>);

        return (
            <div>
                <div className="text-center">Issues stats</div>
                 <Progress multi>
                    {content}
                </Progress>
            </div>
        );
    }
}

IssuesStats.propTypes = {
    dispatch: PropTypes.func.isRequired,
    stats: PropTypes.array,
};

const mapStateToProps = state => {
    return {
        stats: state.stats.stats,
    };
};

export default connect(mapStateToProps)(IssuesStats);
