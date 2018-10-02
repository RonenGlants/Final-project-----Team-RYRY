import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../HomePage.css';

export default class FriendRequestsModal extends React.Component {
    constructor(props) {
        super(props);
        this.onAcceptRequest = this.onAcceptRequest.bind(this);
        this.onRejectRequest = this.onRejectRequest.bind(this);
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
                            return <label>hi</label>
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </div>
        );
    }

    onAcceptRequest() {
        //  this.props.onAcceptRequest();
    }

    onRejectRequest(name, value) {
        // this.onRejectRequest({[name]: value})
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
}