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

        var sharedSkillsElement = <div className="title"><label>No mutual skills</label><br/></div>;
        var skillsThatCanBeTaughtElement = <div className="title">{this.props.firstName} can't teach you anything<br/></div>;
        var sharedDesiredSkillsElement = <div className="title">{this.props.firstName} and you doesn't share any desired skills<br/>
        </div>;
        var skillsThatCanTeachElement = <div className="title">You can't teach {this.props.firstName} anything<br/></div>;
        var skillsThatCanBeTaught = this.props.getSkillsThatCanBeTaught(this.props.currentUserId, this.props.id);
        var sharedSkills = this.props.getSharedSkills(this.props.currentUserId, this.props.id);
        var sharedDesiredSkills = this.props.getSharedDesiredSkills(this.props.currentUserId, this.props.id);
        var skillsThatCanTeach = this.props.getSkillsThatCanTeach(this.props.currentUserId, this.props.id);


        if (this.props.id === this.props.manager) {
            footer = <label className="admin-label">Group Admin</label>;
        }
        else if (this.props.isManager) {
            footer = <Button color="danger" onClick={this.handleRemoveFriend}>Remove Friend</Button>;
        }

        if (sharedSkills.length > 0) {
            sharedSkillsElement =
                <div>
                    <label className="title">Mutual skills</label>
                    {sharedSkills.map(sharedSkill => {
                        return (
                            <div>
                                <small>   {sharedSkill.text}</small>
                                <br/>
                            </div>);
                    })}
                </div>
        }

        if (skillsThatCanBeTaught.length > 0) {
            skillsThatCanBeTaughtElement =
                <div>
                    <label className="title">Skills that friend can teach you</label>
                    {skillsThatCanBeTaught.map((skill) => {
                        return (
                            <div>
                                <small>   {skill.text}</small>
                                <br/>
                            </div>);
                    })}
                </div>
        }

        if (sharedDesiredSkills.length > 0) {
            sharedDesiredSkillsElement =
                <div>
                    <label className="title">Shared desired skills</label>
                    {sharedDesiredSkills.map((skill) => {
                        return (
                            <div>
                                <small>   {skill.text}</small>
                                <br/>
                            </div>);
                    })}
                </div>
        }

        if (skillsThatCanTeach.length > 0) {
            skillsThatCanTeachElement =
                <div>
                    <label className="title">Skills that you can teach friend</label>
                    {skillsThatCanTeach.map((skill) => {
                        return (
                            <div>
                                <small>   {skill.text}</small>
                                <br/>
                            </div>);
                    })}
                </div>
        }

        return (
            <div id="friend-info-modal-wrapper">
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
                    {sharedDesiredSkillsElement}
                    <br/>
                    {skillsThatCanBeTaughtElement}
                    <br/>
                    {skillsThatCanTeachElement}
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