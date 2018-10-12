import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import '../HomePage/HomePage.css';
import {Col, Row} from 'reactstrap';

export default class FriendRequestsModal extends React.Component {
    constructor(props) {
        super(props);
        this.onAcceptRequest = this.onAcceptRequest.bind(this);
        this.onRejectRequest = this.onRejectRequest.bind(this);
        this.removeRequestFromDataBase = this.removeRequestFromDataBase.bind(this);
        this.state = {
            open: false,
            requests: [],
        }
    }

    componentWillMount() {
        this.getRequestsData();
    }

    render() {
        const {open} = this.state.open;
        return (
            <div>
                <ModalHeader>Friend requests</ModalHeader>
                <ModalBody>
                    <div className="request">
                        {this.state.requests.map(request => {
                            var value = {
                                groupName: request.groupId,
                                userId: request.userId
                            };

                            var valueString = value.groupName + "$" + value.userId;

                            return <form className="request-wrapper">
                                <Row>
                                    <Col>
                                         <label>group: {value.groupName}</label>
                                    </Col>
                                    <Col>
                                         <label>user: {value.userId}</label>
                                    </Col>
                                    <Col>
                                        <Button color="success" name="Accept" value={valueString}
                                                onClick={this.onAcceptRequest}>Accept</Button>
                                    </Col>
                                    <Col>
                                        <Button color="danger" name="Reject" value={valueString} onClick={this.onRejectRequest}>Reject</Button>
                                    </Col>
                                </Row>
                            </form>
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </div>
        );
    }

    onAcceptRequest(event) {
        var groupName = event.target.value.split("$")[0];
        var userId = event.target.value.split("$")[1];
        this.props.closeModal();

        return fetch('/groups/addUserToGroup', {
            method: 'POST',
            body: JSON.stringify({
                groupName: groupName,
                userId: userId,
            }),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("OK with addUserToGroup")
                    this.removeRequestFromDataBase(groupName, userId);
                } else {
                    console.log("403 with addUserToGroup")
                    // this.showLoginErrorMessage("Email or Password are incorrect.")
                }
            });
    }

    onRejectRequest(event) {
        var groupName = event.target.value.split("$")[0];
        var userId = event.target.value.split("$")[1];
        this.props.closeModal();
        this.removeRequestFromDataBase(groupName, userId);
    }

    getRequestsData() {
        fetch('requests/requests?adminId=' + this.props.adminId, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(content => {
                this.setState({
                    requests: content.requests,
                });
            })
            .catch(err => {
                throw err
            });
    }

    removeRequestFromDataBase(groupId, userId) {
        return fetch('/requests/deleteRequest', {
            method: 'POST',
            body: JSON.stringify({
                adminId: this.props.adminId,
                userId: userId,
                groupId: groupId
            }),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("OK with deleteRequest")
                    //this.props.loginSuccessHandler(userName, userPassword);
                } else {
                    console.log("403 with deleteRequest")
                    // this.showLoginErrorMessage("Email or Password are incorrect.")
                }
            });
    }
}