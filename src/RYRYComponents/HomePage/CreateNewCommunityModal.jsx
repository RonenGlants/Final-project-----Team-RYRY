import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../HomePage.css';
import InputContainer from "../LandingPage/Containers/InputContainer.jsx";

export default class CreateNewCommunityModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            open: false,
            createCommunityStatus: '',
            communityTitle: '',
            description: '',
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
                    <label>{this.state.createCommunityStatus}</label>
                </ModalFooter>
            </div>
        );
    }

    handleCreate(){
        const newCommunity = {
            name: this.state.communityTitle,
            manager: this.props.userName,
            friends: [this.props.userName],
            description: this.state.description,
        };

        this.props.onCreateGroup(newCommunity).then(isCreated => {
            if (isCreated === true) {
                this.setState({
                    createCommunityStatus: 'Community created!'
                });
            }
            else {
                this.setState({
                    createCommunityStatus: 'Event or Community with that title already exists!'
                });
            }
        });
    }

    handleCancel(){
        this.props.onCancel();
    }

    handleChange(name, value){
        this.setState({[name]: value})
    }
}
