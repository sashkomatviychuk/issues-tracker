import React from 'react';

import Button from 'reactstrap/lib/Button'
import Modal from 'reactstrap/lib/Modal'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalFooter from 'reactstrap/lib/ModalFooter'
import FormGroup from 'reactstrap/lib/FormGroup'
import Label from 'reactstrap/lib/Label'
import Input from 'reactstrap/lib/Input'

import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'

import { createIssue, updateIssue } from './../../actions/issues'
import { hideModal } from './../../actions/modal'

const statusMap = {
    open: 0,
    pending: 1,
    closed: 2,
};

const statusList = [
    {
        value: 'open',
        label: 'Open',
    },
    {
        value: 'pending',
        label: 'Pending',
    },
    {
        value: 'closed',
        label: 'Closed',
    },
];

const prioritiesList = [
    {
        value: 'low',
        label: 'Low',
    },
    {
        value: 'normal',
        label: 'Normal',
    },
    {
        value: 'high',
        label: 'High',
    },
];

class IssueFormModal extends React.Component {

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);

        this.state = {
            title: '',
            description: '',
            status: 'open',
            priority: 'normal',
        };
    }

    componentDidMount() {
        if (this.props.issue) {
            this.setState(this.props.issue);
        }
    }

    /**
     * @param {Object} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.issue) {
            this.setState(nextProps.issue);
        } else {
            this.setState({
                title: '',
                description: '',
                status: 'open',
                priority: 'normal',
            });
        }
    }

    onClose() {
        this.props.dispatch(hideModal());
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        });
    }

    onSend(e) {
        const { issueIndex, issue } = this.props;

        if (issue) {
            this.props.dispatch(updateIssue(issueIndex, {
                ...this.state,
                _id: issue._id,
            }));
        } else {
            this.props.dispatch(createIssue(this.state));
        }
    }

    getStatusList() {
        const current = this.props.issue ? this.props.issue.status : 'open';
        const filtered = statusList.filter(s => statusMap[s.value] >= statusMap[current]);

        return filtered.map(s => (<option key={s.value} value={s.value}>
            {s.label}
            </option>
        ));
    }

    getPrioritiesList() {
        return prioritiesList.map(s => (<option key={s.value} value={s.value}>
            {s.label}
            </option>
        ));
    }

    render() {
        const statusList = this.getStatusList();
        const prioritiesList = this.getPrioritiesList();
        const header = this.props.issue ? 'Update issue': 'Create issue';
        const butonText = this.props.issue ? 'Update': 'Create';
        const currentPriority = this.props.issue ? this.props.issue.priority : 'normal';
        const currentStatus = this.props.issue ? this.props.issue.status : 'open';
        const currentTitle = this.props.issue ? this.props.issue.title : '';
        const currentDescr = this.props.issue ? this.props.issue.description : '';

        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Issue title"
                                onChange={this.onChange}
                                defaultValue={currentTitle}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                onChange={this.onChange}
                                defaultValue={currentDescr}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="select" name="status" id="status" onChange={this.onChange}>
                                {statusList}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="priority">Priority</Label>
                            <Input
                                type="select"
                                name="priority"
                                id="priority"
                                onChange={this.onChange}
                                defaultValue={currentPriority}
                            >
                                {prioritiesList}
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSend}>{butonText}</Button>{' '}
                        <Button color="secondary" onClick={this.onClose} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

IssueFormModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    issue: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        isOpen: state.modal.isOpen,
        issue: state.modal.issue || null,
        issueIndex: state.modal.issueIndex,
    };
};

export default connect(mapStateToProps)(IssueFormModal);
