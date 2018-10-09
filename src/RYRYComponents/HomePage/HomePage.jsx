import React from 'react';
import Modal from 'react-responsive-modal';
import Search from "react-search-box";
import {Button, Card, CardBody, CardHeader, CardImg, Col, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import CommunityListContainer from "../Containers/CommunityListContainer.jsx";
import './HomePage.css';
import UserCardDropDownContainer from "../Containers/UserCardDropDownContainer.jsx";
import NewsfeedContainer from "../Containers/NewsfeedContainer.jsx";
import CreateNewCommunityModal from "../Modals/CreateNewCommunityModal.jsx";
import CreateNewEventModal from "../Modals/CreateNewEventModal.jsx";
import {BrowserRouter} from 'react-router-dom';
import {Redirect} from 'react-router';

import FriendRequestsModal from "../Modals/FriendRequestsModal.jsx";

require('url');

export default class HomePage extends React.Component {
    constructor(args) {
        super(...args);
        this.userLogOut = this.userLogOut.bind(this);
        this.userProfileClick = this.userProfileClick.bind(this);
        this.userSettingsClick = this.userSettingsClick.bind(this);
        this.onOpenModalCommunity = this.onOpenModalCommunity.bind(this);
        this.onOpenModalEvent = this.onOpenModalEvent.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onGroupClick = this.onGroupClick.bind(this);
        this.onOpenFriendRequestsModal = this.onOpenFriendRequestsModal.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.showSelectedGroupPage = this.showSelectedGroupPage.bind(this);
        this.getGroupsFeeds = this.getGroupsFeeds.bind(this);
        this.getAllFeeds = this.getAllFeeds.bind(this);


        this.state = {
            userFirstName: null,
            userLastName: null,
            myCommunities: [],
            myEvents: [],
            feeds: [],
            communityModalOpen: false,
            eventModalOpen: false,
            typeForModal: '',
            redirectGroupPage: false,
            redirectEditProfilePage: false,
            friendRequestsModalOpen: false,
            allGroups: [],

        }
    }

    componentWillMount() {
        clearInterval(this.interval);
        this.getUser();
        this.getAllFeeds();
        this.getCommunitiesAndEvents();
        this.getAllGroups();
    }

    componentDidMount() {
        setInterval(() => {
            this.getAllFeeds();
        }, 1000);
    }

    getCommunitiesAndEvents() {
        return fetch('groups/usersGroups?userName=' + this.props.userName, {
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
                console.log("fetching all groups succeeded")
                this.setState({
                    myCommunities: content.communities,
                    myEvents: content.events,
                })
            })
            .catch(err => {
                throw err
            });
    }

    getAllFeeds() {
        var allMyGroups = [];

        this.state.myEvents.map(event => allMyGroups.push(event.name));
        this.state.myCommunities.map(community => allMyGroups.push(community.name));

        fetch('feeds/groupsListFeeds?groupsNames=' + allMyGroups, {
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
                this.setState({feeds: content.feeds})

            })
            .catch(err => {
                throw err
            });
    }

    getGroupsFeeds(groupName) {
        fetch('feeds/groupsFeeds?groupName=' + groupName, {
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
                content.feeds.map(feed => {
                    this.state.feeds.push(feed);
                });
            })
            .catch(err => {
                throw err
            });
    }

    getUser() {
        return fetch('users/user?userName=' + this.props.userName, {
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
                console.log("fetching full name succeeded");
                this.setState({
                    userFirstName: content.user.firstName,
                    userLastName: content.user.lastName,
                })
            })
            .catch(err => {
                throw err
            });
    }

    render() {
        if (this.state.redirectGroupPage) {
            return (
                <Redirect push to="grouppage"/>
            )
        }
        if (this.state.redirectEditProfilePage) {
            return (
                <Redirect push to="editprofile"/>
            )
        }
        return (
            <div className="home-page-root">
                <div className="home-page-body">
                    <Modal open={this.state.friendRequestsModalOpen} onClose={this.onCloseModal}>
                        <FriendRequestsModal onAcceptRequest={this.onAcceptRequest}
                                             onRejectRequest={this.onRejectRequest}
                                             adminId={this.props.userName}/>
                    </Modal>
                    <Modal open={this.state.communityModalOpen} onClose={this.onCloseModal}>
                        <CreateNewCommunityModal onCancel={this.onCloseModal} onCreateGroup={this.insertGroup}
                                                 userName={this.props.userName}/>
                    </Modal>
                    <Modal open={this.state.eventModalOpen} onClose={this.onCloseModal}>
                        <CreateNewEventModal onCancel={this.onCloseModal} onCreateGroup={this.insertGroup}
                                             userName={this.props.userName}/>
                    </Modal>
                    <Row className="row-root">
                        <Col sm={{size: 'auto'}} className="user-profile-wrapper card-wrapper">
                            <Card>
                                <CardHeader>
                                    <Button onClick={this.userProfileClick}><CardImg top width="100%"
                                                                                     src={UserProfileLogo}/></Button>
                                    Hello, {this.state.userFirstName} {this.state.userLastName}
                                </CardHeader>
                                <CardBody>
                                    <UserCardDropDownContainer userName={this.state.userFirstName}
                                                               invokeLogOut={this.userLogOut}
                                                               invokeProfilePage={this.userProfileClick}
                                                               invokeSettingsPage={this.userSettingsClick}
                                                               invokeCreateNewCommunity={this.onOpenModalCommunity}
                                                               invokeCreateNewEvent={this.onOpenModalEvent}
                                                               invokeFriendRequestsManagement={this.onOpenFriendRequestsModal}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Search data={this.state.allGroups} onChange={this.showSelectedGroupPage}
                                placeholder="search group"
                                searchKey="name"></Search>
                        <Col className="feeds-wrapper">
                            <NewsfeedContainer myFeeds={this.state.feeds}/>
                        </Col>
                        <Col className="groups-wrapper">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>My Communities</CardHeader>
                                    <CardBody>
                                        <CommunityListContainer myType="communities"
                                                                myCommunities={this.state.myCommunities}
                                                                invokeOnGroupClick={this.onGroupClick}/>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>My Events</CardHeader>
                                    <CardBody>
                                        <CommunityListContainer myType="events" myCommunities={this.state.myEvents}
                                                                invokeOnGroupClick={this.onGroupClick}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    onGroupClick(groupName, type) {
        let group;

        if (type == "events") {
            this.state.myEvents.forEach(event => {
                if (event.name == groupName) {
                    group = event;
                }
            })
        }

        else if (type == "communities") {
            this.state.myCommunities.forEach(community => {
                if (community.name == groupName) {

                    group = community;
                }
            })
        }

        this.props.showGroupPage(groupName, group);
        this.setState({redirectGroupPage: true});
    }

    userLogOut() {
        this.props.invokeDisplayLandingPage();
    }

    userProfileClick() {
        this.props.showUserProfile();
        this.setState({redirectEditProfilePage: true});
    }

    userSettingsClick() {
        // todo: create a settingPage container and invoke basecontainer to render it by props
    }

    insertGroup(newGroup) {
        return fetch('/groups/addGroup', {
            method: 'POST',
            body: JSON.stringify(newGroup),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("group inserted?");
                    return true;
                } else {
                    console.log("403 with addGroup");
                    return false;
                }
            });
    }

    onOpenModalCommunity() {
        this.setState({communityModalOpen: true})
    };

    onOpenModalEvent() {
        this.setState({eventModalOpen: true})
    }

    onCloseModal() {
        this.setState({
            communityModalOpen: false,
            eventModalOpen: false,
            friendRequestsModalOpen: false,
        })
    };

    getAllGroups() {
        return fetch('groups/allGroups', {
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
                console.log("fetching all group names succeeded");

                this.setState({
                    allGroups: content.allGroups,
                })
            })
            .catch(err => {
                throw err
            });
    };

    showSelectedGroupPage(selectedGroup) {
        this.props.showGroupPage(selectedGroup.name, selectedGroup);
        this.setState({redirectGroupPage: true});
    }

    onOpenFriendRequestsModal() {
        this.setState({friendRequestsModalOpen: true});
    }
}