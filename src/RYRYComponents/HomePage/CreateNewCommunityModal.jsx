import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../HomePage.css';
import InputContainer from "../LandingPage/Containers/InputContainer.jsx";

export default class CreateNewCommunityModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            communityName: '',
        }

    }

    render() {
        const { open } = this.state.open;
        return (
            <div>


            </div>
        );
    }
}