import React from 'react'

import ButtonDropdown from 'reactstrap/lib/ButtonDropdown'
import DropdownToggle from 'reactstrap/lib/DropdownToggle'
import DropdownMenu from 'reactstrap/lib/DropdownMenu'
import DropdownItem from 'reactstrap/lib/DropdownItem'

import connect from 'react-redux/lib/connect/connect'
import PropTypes from 'prop-types'

import { showModal } from './../../actions/modal'
import { removeIssue } from './../../actions/issues'

class IssueOptionsDropdown extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            dropdownOpen: false
        };
        
        this.toggle = this.toggle.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onEdit(e) {
        const { issue, index } = this.props;

        this.props.dispatch(showModal(issue, index));
    }

    onRemove() {
        const { issue, index } = this.props;

        if (confirm('Remove this issue?')) {
            this.props.dispatch(removeIssue(index, issue));
        }
    }

    render() {
        const { isOnline } = this.props;

        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle className="options-button">
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={this.onEdit} disabled={!isOnline}>
                        Edit
                    </DropdownItem>
                    <DropdownItem onClick={this.onRemove} disabled={!isOnline}>
                        Remove
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

IssueOptionsDropdown.propTypes = {
    dispatch: PropTypes.func.isRequired,
    index: PropTypes.number,
    issue: PropTypes.object,
};

const mapStateToProps = state => state.app;

export default connect(mapStateToProps)(IssueOptionsDropdown);