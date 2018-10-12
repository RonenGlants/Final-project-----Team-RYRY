import React from 'react';
import Modal from 'react-responsive-modal';
import FriendsListContainer from './FriendsListContainer.jsx';
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardFooter, Col, Row} from 'reactstrap';
import NewsfeedContainer from "../Containers/NewsfeedContainer.jsx";
import AddNewsfeedContainer from "../Containers/AddNewsfeedContainer.jsx";
import './GroupPage.css';
import FriendInfoModal from "../Modals/FriendInfoModal.jsx";


export default class GroupPage extends React.Component {
    constructor(args) {
        super(...args);
        this.getFeeds = this.getFeeds.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.friendRequest = this.friendRequest.bind(this);
        this.openFriendInfoModal = this.openFriendInfoModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.removeFriend = this.removeFriend.bind(this);

        this.state = {
            myFeeds: [],
            friendInfoModal: false,
            selectedFriend: null,
        }
    }

    componentWillMount() {
        clearInterval(this.interval);
        this.getFeeds();
    }

    componentDidMount() {
        setInterval(() => {
            this.getFeeds();
        }, 5000);
    }

    render() {
        var deleteGroupButton = null;
        var friendRequestButton = null;

        if (this.props.currentUserName === this.props.manager) {
            deleteGroupButton = <Button onClick={this.deleteGroup}>Delete This Group</Button>
        }
        else if (this.props.friends.filter(friend => {
            friend = this.props.currentUserName
        }).length == 0) {
            friendRequestButton = <Button onClick={this.friendRequest}>Friend Request</Button>
        }

        return (
            <div>
                <Modal open={this.state.friendInfoModal} onClose={this.onCloseModal}>
                    <FriendInfoModal {...this.state.selectedFriend} manager={this.props.manager} isManager={this.props.manager === this.props.currentUserName} onRemove={this.removeFriend}/>
                </Modal>
                <Card>
                    <CardHeader>Group name: {this.props.name}</CardHeader>
                    <CardBody>
                        <CardTitle>Admin: {this.props.manager}</CardTitle>
                        <CardSubtitle>Description: {this.props.description}</CardSubtitle>
                    </CardBody>
                </Card>
                <br/>
                <div>
                    <NewsfeedContainer myFeeds={this.state.myFeeds}/>
                    <AddNewsfeedContainer groupName={this.props.name} currentUserId={this.props.currentUserName}/>
                </div>
                <br/>
                <Card>
                    <CardHeader>Friends List</CardHeader>
                    <CardBody>
                        <FriendsListContainer myFriends={this.props.friends} openFriendInfoModal={this.openFriendInfoModal}/>
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
            body: JSON.stringify({
                adminId: this.props.manager,
                userId: this.props.currentUserName,
                groupId: this.props.name
            }),
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

    getFeeds() {
        fetch('feeds/groupsFeeds?groupName=' + this.props.name, {
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
                this.setState({myFeeds: content.feeds});
            })
            .catch(err => {
                throw err
            });
    }

    openFriendInfoModal(friend) {
        this.setState({
            selectedFriend: friend,
            friendInfoModal: true
        });
    }

    onCloseModal() {
        this.setState({friendInfoModal: false});
    }

    removeFriend(friendId){
        return fetch('/groups/removeUserToGroup', {
            method: 'POST',
            body: JSON.stringify({
                groupName: this.props.name,
                userId: friendId,
            }),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("OK with removeUserToGroup")
                } else {
                    console.log("403 with removeUserToGroup")
                }
            });
    }
}