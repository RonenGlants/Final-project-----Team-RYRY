import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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

        return (
            <div>
                <ModalHeader>Friend Info</ModalHeader>
                <ModalBody>
                    <label>first name: {this.props.firstName}</label>
                    <br/>
                    <label>last name: {this.props.lastName}</label>
                    <br/>
                    <label>email: {this.props.id}</label>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.handleRemoveFriend}>Remove Friend</Button>
                </ModalFooter>
            </div>
        );
    }

    handleRemoveFriend() {
        //this.props.onRemove();
    }
}