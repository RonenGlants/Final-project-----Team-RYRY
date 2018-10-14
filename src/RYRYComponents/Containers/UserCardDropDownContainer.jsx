import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export default class UserCardDropDownContainer extends React.Component {
    constructor(args){
        super(...args);

        this.toggle = this.toggle.bind(this);
        this.profileClick = this.profileClick.bind(this);
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
                <DropdownToggle className="user-options" caret>

                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>{this.props.userName}</DropdownItem>
                    <DropdownItem onClick={this.profileClick}>My Profile</DropdownItem>
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


    logOutClick(){
        this.props.invokeLogOut();
    }

    friendRequestsManagementClick(){
        this.props.invokeFriendRequestsManagement();
    }
}
