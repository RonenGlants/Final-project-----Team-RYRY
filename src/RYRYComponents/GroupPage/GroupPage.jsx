import React from 'react';
import Modal from 'react-responsive-modal';
import FriendsListContainer from './FriendsListContainer.jsx';
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardFooter, Col, Row} from 'reactstrap';
import NewsfeedContainer from "../Containers/NewsfeedContainer.jsx";
import AddNewsfeedContainer from "../Containers/AddNewsfeedContainer.jsx";
import './GroupPage.css';
import FriendInfoModal from "../Modals/FriendInfoModal.jsx";
import { Redirect } from 'react-router';


export default class GroupPage extends React.Component {
    constructor(args) {
        super(...args);
        this.getFeeds = this.getFeeds.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.friendRequest = this.friendRequest.bind(this);
        this.openFriendInfoModal = this.openFriendInfoModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
        this.intervalID = -1;
        this.calcMatchPoints = this.calcMatchPoints.bind(this);
        this.getFriendsData =this.getFriendsData.bind(this);
        this.getSharedSkills = this.getSharedSkills.bind(this);
        this.getSkillsThatCanBeTaught = this.getSkillsThatCanBeTaught.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);

        this.state = {
            myFeeds: [],
            friendInfoModal: false,
            selectedFriend: null,
            redirect: false,
            friendsData:[],
            firstName: "",
            lastName: "",
            joinGroupButton: "Join group",
            disableJoinButton: false,
        }
    }

    componentWillMount() {
        clearInterval(this.interval);
        this.getFeeds();
        this.getFriendsData(this.props.friends);
    }

    componentDidMount() {
        this.intervalID = setInterval(() => {
            this.getFeeds();
            this.getFriendsData(this.props.friends);
        }, 1000);
    }

    render() {
        if(this.state.redirect){
            return(
                <Redirect push to="/homepage"/>
            )
        }
        var deleteGroupButton = null;
        var friendRequestButton = null;
        var dateExpiredLabel = null;
        var endTimeValue = "";
        var startTimeValue = "";
        var endTime = null;
        var startTime = null;
        var leaveGroupButton = null;
        var isGroupAdmin = false;

        if(this.props.startingDate != undefined && this.props.startingTime != undefined && this.props.endingDate != undefined && this.props.endingTime != undefined){
            startTimeValue = this.props.startingTime + "  " + this.props.startingDate;
            startTime = <CardSubtitle>Start: {startTimeValue}</CardSubtitle>
            endTimeValue = this.props.endingTime + "  " + this.props.endingDate;
            endTime = <CardSubtitle>End {endTimeValue}</CardSubtitle>
        }

        if(this.isDateExpired(this.props.endingDate,this.props.endingTime)){
            dateExpiredLabel = <label> Event is expired </label>
        }
        if (this.props.currentUserName === this.props.manager) {
            deleteGroupButton = <Button onClick={this.deleteGroup}>Delete group</Button>
            isGroupAdmin = true;
        }
        else if (this.props.friends.filter(friend => {
            return friend == this.props.currentUserName
        }).length == 0) {
            friendRequestButton = <Button disabled={this.state.disableJoinButton} onClick={this.friendRequest}>{this.state.joinGroupButton}</Button>
        }
        else{
            if(!isGroupAdmin){
                leaveGroupButton = <Button onClick={this.leaveGroup}>Leave group</Button>
            }
        }

        return (
            <div>
                <Modal open={this.state.friendInfoModal} onClose={this.onCloseModal}>
                    <FriendInfoModal {...this.state.selectedFriend} manager={this.props.manager}
                                     isManager={this.props.manager === this.props.currentUserName}
                                     onRemove={this.removeFriend}
                                     calcMatchPoints={this.calcMatchPoints}
                                     currentUserId={this.props.currentUserName}
                                     getSharedSkills = {this.getSharedSkills}
                                     getSkillsThatCanBeTaught = {this.getSkillsThatCanBeTaught}/>
                </Modal>
                <Card>
                    <CardHeader>{this.props.name}</CardHeader>
                    <CardBody>
                        <CardTitle>Group admin: {this.props.manager}</CardTitle>
                        {startTime}
                        {endTime}
                        <CardSubtitle>Description: {this.props.description}</CardSubtitle>
                        {dateExpiredLabel}
                        <br/>
                        {deleteGroupButton}
                        {friendRequestButton}
                        {leaveGroupButton}
                    </CardBody>
                </Card>
                <br/>
                <div>
                    <AddNewsfeedContainer groupName={this.props.name} currentUserId={this.props.currentUserName} firstName={this.props.userInfo.firstName} lastName={this.props.userInfo.lastName}/>
                    <NewsfeedContainer myFeeds={this.state.myFeeds} showGroupName={false}/>
                </div>
                <br/>
                <Card>
                    <CardHeader>Friends List</CardHeader>
                    <CardBody>
                        <FriendsListContainer myFriends={this.props.friends}
                                              openFriendInfoModal={this.openFriendInfoModal}
                                              friendsData = {this.state.friendsData}/>
                    </CardBody>
                </Card>
            </div>
        )
    }

    isDateExpired(endDate,endTime){
        if(endDate != null && endTime != null){
            var date = endDate.split("-");
            var time = endTime.split(":");
            var year = parseInt(date[0]);
            var month = parseInt(date[1]);
            var day = parseInt(date[2]);
            var hour = parseInt(time[0]);
            var min = parseInt(time[1]);
            var eventEndDate = new Date();
            eventEndDate.setFullYear(year, month - 1, day);
            eventEndDate.setHours(hour);
            eventEndDate.setMinutes(min);
            if(new Date() > eventEndDate){
                return true;
            }
            else{
                return false;
            }

        }
        else{
            return false;
        }
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
                    clearInterval(this.intervalID);
                    this.setState({redirect: true});
                    return true;
                } else {
                    console.log("403 with deleteGroup")
                    return false;
                }
            });
    }

    friendRequest() {
        this.setState({joinGroupButton : "Request sent",disableJoinButton:true});

        return fetch('/requests/addRequest', {
            method: 'POST',
            body: JSON.stringify({
                adminId: this.props.manager,
                userId: this.props.currentUserName,
                groupId: this.props.name,
                skills: this.props.mySkills,
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
    leaveGroup() {
        return fetch('/groups/removeUserToGroup', {
            method: 'POST',
            body: JSON.stringify({
                groupName: this.props.name,
                userId: this.props.currentUserName,
            }),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    this.setState({
                        redirect: true,
                    });
                } else {
                    console.log("403 with removeUserToGroup")
                }
            });
    }

    removeFriend(friendId) {
        this.onCloseModal();
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

    calcMatchPoints(currentUserId, fiendId) {
        var currentUser = this.state.friendsData.filter(friend => friend.id === currentUserId);
        var fiend = this.state.friendsData.filter(friend => friend.id === fiendId);
        var points = 0;

        if (currentUser.length !== 1 || fiend.length !== 1) {
            return 0;
        }

        currentUser = currentUser[0];
        fiend = fiend[0];

        points += this.calcPointsByLists(currentUser.mySkills, fiend.mySkills, 14);
        points += this.calcPointsByLists(currentUser.desiredSkills, fiend.desiredSkills, 5);
        points += this.calcPointsByLists(currentUser.desiredSkills, fiend.mySkills, 50);
        points += this.calcPointsByLists(currentUser.mySkills, fiend.desiredSkills, 25);

        return points;
    }

    getFriendsData(friendsIds) {
        fetch('users/friends?friendsIds=' + friendsIds, {
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
                    friendsData: content.friends,
                });
            })
            .catch(err => {
                throw err
            });
    }


    calcPointsByLists(firsList, secondList, value) {
        var sharedSkills = this.getSharedSkillsByLists(firsList, secondList);
        var points = sharedSkills.length * value;

        return points;
    }

    getSharedSkills(currentUserId, fiendId) {
        var currentUser = this.state.friendsData.filter(friend => friend.id === currentUserId);
        var fiend = this.state.friendsData.filter(friend => friend.id === fiendId);

        if (currentUser.length !== 1 || fiend.length !== 1) {
            return [];
        }

        currentUser = currentUser[0];
        fiend = fiend[0];

        return this.getSharedSkillsByLists(currentUser.mySkills, fiend.mySkills);
    }

    getSkillsThatCanBeTaught(currentUserId, fiendId) {
        var currentUser = this.state.friendsData.filter(friend => friend.id === currentUserId);
        var fiend = this.state.friendsData.filter(friend => friend.id === fiendId);

        if (currentUser.length !== 1 || fiend.length !== 1) {
            return [];
        }

        currentUser = currentUser[0];
        fiend = fiend[0];

        return this.getSharedSkillsByLists(currentUser.desiredSkills, fiend.mySkills);
    }

    getSharedSkillsByLists(firsList, secondList) {
        var sharedSkills = [];

        if (firsList && secondList) {
            firsList.map(firstsSkill => {
                secondList.map(secondsSkill => {
                    if (firstsSkill.id === secondsSkill.id) {
                        sharedSkills.push(firstsSkill)
                    }
                })
            });
        }

        return sharedSkills;
    }
}