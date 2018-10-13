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
        var sharedSkillsElement= <div className="title"><label>No mutual skills</label><br/></div>;
        var skillsThatCanBeTaughtElement= <div className="title">This friend can not teach you anything<br/></div>;
        var skillsThatCanBeTaught = this.props.getSkillsThatCanBeTaught(this.props.currentUserId, this.props.id);
        var sharedSkills= this.props.getSharedSkills(this.props.currentUserId, this.props.id);

        if(this.props.id === this.props.manager) {
            footer = <label>Group Admin</label>;
        }
        else if (this.props.isManager) {
            footer = <Button color="danger" onClick={this.handleRemoveFriend}>Remove Friend</Button>;
        }

        if(sharedSkills.length >0) {
            sharedSkillsElement =
                <div>
                    <label className="title">Mutual skills</label>
                    {sharedSkills.map(sharedSkill => {
                        return(
                        <div>
                            <small>   {sharedSkill.text}</small>
                            <br/>
                        </div>);
                    })}
                </div>
        }

        if(skillsThatCanBeTaught.length >0) {
            skillsThatCanBeTaughtElement =
                <div>
                    <label className="title">Skills that friend can teach you</label>
                    {skillsThatCanBeTaught.map((skill) => {
                        return(
                        <div>
                            <small>   {skill.text}</small>
                            <br/>
                        </div>);
                    })}
                </div>
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
                    <br/>
                    {sharedSkillsElement}
                    <br/>
                    {skillsThatCanBeTaughtElement}
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