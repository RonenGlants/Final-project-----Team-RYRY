import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../HomePage.css';
import InputContainer from "../LandingPage/Containers/InputContainer.jsx";

export default class CreateNewEventModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            open: false,
            eventTitle: '',
            startingDate: '',
            startingTime: '',
            endingDate: '',
            endingTime: '',

        }

    }

    render() {
        const { open } = this.state.open;
        return (
            <div>
                <ModalHeader>Create new event</ModalHeader>
                <ModalBody>
                    <InputContainer myName="eventTitle" labelClassName="event-title-class" labelValue="Event title" type="text" handleMyChange={this.handleChange} />
                    <InputContainer myName="startingDate" labelClassName="starting-date-class" labelValue="Starting date" type="date" handleMyChange={this.handleChange} />
                    <InputContainer myName="startingTime" labelClassName="starting-time-class" labelValue="Starting time" type="time" handleMyChange={this.handleChange} />
                    <InputContainer myName="endingDate" labelClassName="ending-date-class" labelValue="Ending date" type="date" handleMyChange={this.handleChange} />
                    <InputContainer myName="endingTime" labelClassName="ending-time-class" labelValue="Ending time" type="time" handleMyChange={this.handleChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.handleCreate}>Create</Button>
                    <Button color="danger" onClick={this.handleCancel}>Cancel</Button>
                </ModalFooter>
            </div>
        );
    }

    handleCreate(){
        
    }

    handleCancel(){
        this.props.whenCancel();
    }

    handleChange(){

    }
}