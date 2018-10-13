import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../HomePage/HomePage.css';
import InputContainer from "../Containers/InputContainer.jsx";

export default class CreateNewEventModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            open: false,
            createEventStatus: '',
            eventTitle: '',
            description: '',
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
                    <InputContainer myName="eventTitle" labelClassName="event-title-class" labelValue="Name" type="text" handleMyChange={this.handleChange} />
                    <InputContainer myName="description" labelClassName="" inputClassName="group-description" labelValue="Description" type="text" handleMyChange={this.handleChange} />
                    <InputContainer myName="startingDate" labelClassName="starting-date-class" labelValue="Starting date" type="date" handleMyChange={this.handleChange} />
                    <InputContainer myName="startingTime" labelClassName="starting-time-class" labelValue="Starting time" type="time" handleMyChange={this.handleChange} />
                    <InputContainer myName="endingDate" labelClassName="ending-date-class" labelValue="Ending date" type="date" handleMyChange={this.handleChange} />
                    <InputContainer myName="endingTime" labelClassName="ending-time-class" labelValue="Ending time" type="time" handleMyChange={this.handleChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.handleCreate}>Create</Button>
                    <Button color="danger" onClick={this.handleCancel}>Cancel</Button>
                    <label>{this.state.createEventStatus}</label>
                </ModalFooter>
            </div>
        );
    }

    handleCreate() {
        const newEvent = {
            name: this.state.eventTitle,
            manager: this.props.userName,
            friends: [this.props.userName],
            description: this.state.description,
            startingDate: this.state.startingDate,
            startingTime: this.state.startingTime,
            endingDate: this.state.endingDate,
            endingTime: this.state.endingTime
        }
        if(this.isEventValid(newEvent)){
            if(this.isEndDateValid(newEvent)){
                this.props.onCreateGroup(newEvent).then(isCreated => {
                    if (isCreated === true) {
                        this.setState({
                            createEventStatus: 'Event created!'
                        });
                        setTimeout(this.handleCancel, 1000);
                    }
                    else {
                        this.setState({
                            createEventStatus: 'Event or Community with that title already exists!'
                        });
                    }
                });
            }
            else{
                this.setState({
                    createEventStatus: 'Event end date is not valid'
                });
            }
        }
        else{
            this.setState({
                createEventStatus: 'One of the fields above is missing'
            });
        }

    }

    handleCancel(){
        this.setState({
            eventTitle: '',
            startingDate: '',
            startingTime: '',
            endingDate: '',
            endingTime: ''});
        this.props.onCancel();
    }

    handleChange(name, value){
        this.setState({[name]: value})
    }

    getDate(_date,_time){
        var date = _date.split("-");
        var time = _time.split(":");
        var year = parseInt(date[0]);
        var month = parseInt(date[1]);
        var day = parseInt(date[2]);
        var hour = parseInt(time[0]);
        var min = parseInt(time[1]);
        var res = new Date();
        res.setFullYear(year, month - 1, day);
        res.setHours(hour);
        res.setMinutes(min);
        return res;
    }

    isEndDateValid(newEvent){
        var startDate = newEvent.startingDate;
        var startTime = newEvent.startingTime;
        var start = this.getDate(startDate,startTime);
        var endDate = newEvent.endingDate;
        var endTime = newEvent.endingTime;
        var end = this.getDate(endDate,endTime);
        if(end > start){
            return true;
        }
        else{
            return false;
        }
    }
    isEventValid(newEvent){
        if(newEvent.name != "" && newEvent.description != "" && newEvent.startingDate != "" && newEvent.startingTime != "" && newEvent.endingDate != "" && newEvent.endingTime != ""){
            return true;
        }
        else{
            return false;
        }
    }
}