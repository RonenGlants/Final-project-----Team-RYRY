import React from 'react';
import FriendsListContainer from './FriendsListContainer.jsx';
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardFooter, Col, Row} from 'reactstrap';


export default class GroupPage extends React.Component {
    constructor(args) {
        super(...args);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.friendRequest = this.friendRequest.bind(this);
        this.state = {}
    }

    render() {
        var deleteGroupButton = null;
        var friendRequestButton = null;

        if (this.props.currentUserName === this.props.manager) {
            deleteGroupButton = <Button onClick={this.deleteGroup}>Delete This Group</Button>
        }
        else if(this.props.friends.filter(friend=>{friend = this.props.currentUserName}).length == 0)
        {
            friendRequestButton = <Button onClick={this.friendRequest}>Friend Request</Button>
        }
        return (
            <div>
                <Card>
                    <CardHeader>Group name: {this.props.name}</CardHeader>
                    <CardBody>
                        <CardTitle>Admin: {this.props.manager}</CardTitle>
                        <CardSubtitle>Description: {this.props.description}</CardSubtitle>
                    </CardBody>
                </Card>
                <br/>
                <Card>
                    <CardHeader>Friends List</CardHeader>
                    <CardBody>
                        <FriendsListContainer myFriends={this.props.friends}/>
                    </CardBody>
                </Card>
                {deleteGroupButton}
                {friendRequestButton}
            </div>
        )
    }

    deleteGroup() {
        return fetch('/groups/deleteGroup', {
            method: 'POST',
            body: JSON.stringify(this.props.name),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("group deleted")
                    return true;
                } else {
                    console.log("403 with deleteGroup")
                    return false;
                }
            });
    }

    friendRequest() {
        return fetch('/requests/addRequest', {
            method: 'POST',
            body: JSON.stringify({adminId: this.props.manager, userId: this.props.currentUserName, groupId: this.props.name}),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("OK with friendRequest")
                    //this.props.loginSuccessHandler(userName, userPassword);
                } else {
                    console.log("403 with friendRequest")
                    // this.showLoginErrorMessage("Email or Password are incorrect.")
                }
            });
    }
}