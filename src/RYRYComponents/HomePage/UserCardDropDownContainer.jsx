import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export default class UserCardDropDownContainer extends React.Component {
    constructor(args){
        super(...args);

        this.toggle = this.toggle.bind(this);
        this.profileClick = this.profileClick.bind(this);
        this.settingsClick = this.settingsClick.bind(this);
        this.newCommunityClick = this.newCommunityClick.bind(this);
        this.newEventClick = this.newEventClick.bind(this);
        this.logOutClick = this.logOutClick.bind(this);
        this.friendRequestsManagementClick = this.friendRequestsManagementClick.bind(this);

        this.state={
            dropdownOpen: false,
        }

    }

    toggle(){
        // setState has another form - getting a function with the previous state(prevState) as following:
    this.setState(prevState => ({
    dropdownOpen: !prevState.dropdownOpen
    }));
    }


    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>

                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>{this.props.userName}</DropdownItem>
                    <DropdownItem onClick={this.profileClick}>Edit profile</DropdownItem>
                    <DropdownItem onClick={this.settingsClick}>Settings</DropdownItem>
                    <DropdownItem onClick={this.newCommunityClick}>Create new community</DropdownItem>
                    <DropdownItem onClick={this.newEventClick}>Create new event</DropdownItem>
                    <DropdownItem onClick={this.friendRequestsManagementClick}>Check for pending friend requests</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><Button className="btn-danger" onClick={this.logOutClick}>Log out</Button></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    profileClick(){
        this.props.invokeProfilePage();
    }

    settingsClick(){
        this.props.invokeSettingsPage();
    }

    newCommunityClick(){
        this.props.invokeCreateNewCommunity();
    }

    newEventClick(){
        this.props.invokeCreateNewEvent();
    }

    logOutClick(){
        this.props.invokeLogOut();
    }

    friendRequestsManagementClick(){
        this.props.invokeFriendRequestsManagement();
    }
}
