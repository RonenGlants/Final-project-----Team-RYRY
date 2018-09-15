import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export default class UserCardDropDownContainer extends React.Component {
    constructor(args){
        super(...args);

        this.toggle = this.toggle.bind(this);
        this.profileClick = this.profileClick.bind(this);
        this.settingsClick = this.settingsClick.bind(this);
        this.logOutClick = this.logOutClick.bind(this);

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
                    <DropdownItem onClick={this.profileClick}>Profile</DropdownItem>
                    <DropdownItem onClick={this.settingsClick}>Settings</DropdownItem>
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

    logOutClick(){
        this.props.invokeLogOut();
    }
}
