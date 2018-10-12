import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import '../HomePage/HomePage.css';

export default class FriendInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);

        this.state = {
            open: false,
        }
    }

    render() {
        const {open} = this.state.open;

        var footer = null;


        if(this.props.id === this.props.manager) {
            footer = <label>Manager</label>;
        }
        else if (this.props.isManager) {
            footer = <Button color="danger" onClick={this.handleRemoveFriend}>Remove Friend</Button>;
        }

        return (
            <div>
                <ModalHeader>Friend Info</ModalHeader>
                <ModalBody>
                    <label>First name: {this.props.firstName}</label>
                    <br/>
                    <label>Last name: {this.props.lastName}</label>
                    <br/>
                    <label>Email: {this.props.id}</label>
                    <br/>
                    <label>Match Points: {this.props.calcMatchPoints(this.props.currentUserId, this.props.id)}</label>
                </ModalBody>
                <ModalFooter>
                    {footer}
                </ModalFooter>
            </div>
        );
    }

    handleRemoveFriend() {
        this.props.onRemove(this.props.id);
    }
}