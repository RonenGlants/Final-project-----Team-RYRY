import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../HomePage.css';
import InputContainer from "../LandingPage/Containers/InputContainer.jsx";

export default class CreateNewCommunityModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            communityTitle: '',
            communityDescription: '',
        }

    }

    render() {
        const { open } = this.state.open;
        return (
            <div>
                <ModalHeader>Create new event</ModalHeader>
                <ModalBody>
                    <InputContainer myName="communityTitle" labelClassName="community-title-class" labelValue="Community title" type="text" handleMyChange={this.handleChange}/>
                    <InputContainer myName="description" inputClassName="group-description" labelValue="Description" type="text" handleMyChange={this.handleChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.handleCreate}>Create</Button>
                    <Button color="danger" onClick={this.handleCancel}>Cancel</Button>
                </ModalFooter>
            </div>
        );
    }

    handleCreate(){
        const newCommunity = {
            title: this.state.communityTitle,
            description: this.state.description,
        }
        this.props.onCreateGroup(newCommunity);
    }

    handleCancel(){
        this.props.onCancel();
    }

    handleChange(name, value){
        this.setState({[name]: value})

    }
}
