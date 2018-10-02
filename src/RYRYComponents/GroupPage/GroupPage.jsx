import React from 'react';
import Modal from 'react-responsive-modal';
import FriendsListContainer from './FriendsListContainer.jsx';
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardFooter, Col, Row} from 'reactstrap';


export default class GroupPage extends React.Component {
    constructor(args) {
        super(...args);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.state = {}
    }

    render() {
        var deleteGroupButton = null;
        if (this.props.currentUserName === this.props.manager) {
            deleteGroupButton = <Button onClick={this.deleteGroup}>Delete This Group</Button>
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
}