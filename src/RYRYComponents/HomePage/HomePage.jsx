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
import {BrowserRout} from 'react-router-dom';
import {Redirect} from 'react-router';
import Avatar1 from '../Resources/avatar1.jpeg';
import Avatar2 from '../Resources/avatar2.jpeg';
import Avatar3 from '../Resources/avatar3.jpeg';
import Avatar4 from '../Resources/avatar4.jpeg';
import Avatar5 from '../Resources/avatar5.jpeg';
import Avatar6 from '../Resources/avatar6.jpeg';
import Avatar7 from '../Resources/avatar7.jpeg';
import Avatar8 from '../Resources/avatar8.jpeg';
import Avatar9 from '../Resources/avatar9.jpeg';
import Avatar10 from '../Resources/avatar10.jpeg';
import Avatar11 from '../Resources/avatar11.jpeg';
import Avatar12 from '../Resources/avatar12.jpeg';
import Avatar13 from '../Resources/avatar13.jpeg';
import Avatar14 from '../Resources/avatar14.jpeg';
import Avatar15 from '../Resources/avatar15.jpeg';
import Avatar16 from '../Resources/avatar16.jpeg';

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
        this.deleteAllDBs = this.deleteAllDBs.bind(this);
        this.getLogoByNumber = this.getLogoByNumber.bind(this);

        this.state = {
            user: null,
            myCommunities: [],
            myEvents: [],
            feeds: [],
            communityModalOpen: false,
            eventModalOpen: false,
            typeForModal: '',
            mySkills: [],
            desiredSkills: [],
            redirectGroupPage: false,
            redirectEditProfilePage: false,
            redirectLandingPage: false,
            friendRequestsModalOpen: false,
            allGroups: [],
            avatarNumber: "1",
            userProfileLogo: UserProfileLogo,
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
            this.getCommunitiesAndEvents();
            this.getAllGroups();
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
                this.setState({
                    userFirstName: content.user.firstName,
                    userLastName: content.user.lastName,
                    desiredSkills: content.user.desiredSkills,
                    mySkills: content.user.mySkills,
                    user: content.user,
                    avatarNumber: content.user.avatarNumber || "1",
                    userProfileLogo: this.getLogoByNumber(content.user.avatarNumber),
                })
            })
            .catch(err => {
                throw err
            });
    }

    render() {
        var firstName, lastName;

        if (this.state.user) {
            firstName = this.state.user.firstName;
            lastName = this.state.user.lastName;
        }

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
        if (this.state.redirectLandingPage) {
            return (
                <Redirect push to="/"/>
            )
        }
        return (
            <div className="home-page-root">
                <div className="home-page-body">
                    <Modal open={this.state.friendRequestsModalOpen} onClose={this.onCloseModal}>
                        <FriendRequestsModal onAcceptRequest={this.onAcceptRequest}
                                             onRejectRequest={this.onRejectRequest}
                                             closeModal={this.onCloseModal}
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
                                                                                     src={this.state.userProfileLogo}/></Button>
                                    Hello, {firstName} {lastName}
                                </CardHeader>
                                <CardBody>
                                    <UserCardDropDownContainer userName={firstName}
                                                               invokeLogOut={this.userLogOut}
                                                               invokeProfilePage={this.userProfileClick}
                                                               invokeCreateNewCommunity={this.onOpenModalCommunity}
                                                               invokeCreateNewEvent={this.onOpenModalEvent}
                                                               invokeFriendRequestsManagement={this.onOpenFriendRequestsModal}/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="feeds-wrapper">
                            <NewsfeedContainer myFeeds={this.state.feeds} showGroupName={true}/>
                        </Col>
                        <Col className="groups-wrapper">
                            <div id="search-groups">
                                <Search data={this.state.allGroups}
                                        onChange={this.showSelectedGroupPage}
                                        placeholder="Search"
                                        searchKey="name"
                                        width={300}
                                        height={40}>
                                </Search>
                            </div>
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
                            <Button onClick={this.deleteAllDBs}>Delete All DBs</Button>
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

        this.props.showGroupPage(groupName, group, this.state.user);
        this.setState({redirectGroupPage: true});
    }

    userLogOut() {
        this.setState({redirectLandingPage: true});
    }

    userProfileClick() {
        this.props.showUserProfile(this.state.avatarNumber);
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
        this.getCommunitiesAndEvents();

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
              this.setState({
                    allGroups: content.allGroups,
                })
            })
            .catch(err => {
                throw err
            });
    };

    showSelectedGroupPage(selectedGroup) {
        this.props.showGroupPage(selectedGroup.name, selectedGroup, this.state.user);
        this.setState({redirectGroupPage: true});
    }

    onOpenFriendRequestsModal() {
        this.setState({friendRequestsModalOpen: true});
    }

    deleteAllDBs(){
        return fetch('/users//deleteAll', {
            method: 'POST',
            credentials: 'include'
        }).then(response => {        // response is the result
            if (response.ok) {      // ok == 200
                console.log("delete all DBs success")
            } else {
                console.log("delete all DBs : response not ok")
            }
        });
    }

    getLogoByNumber(number) {
        if (number === "1") {
            return Avatar1
        } else if (number === "2") {
            return Avatar2
        } else if (number === "3") {
            return Avatar3
        } else if (number === "4") {
            return Avatar4
        } else if (number === "5") {
            return Avatar5
        } else if (number === "6") {
            return Avatar6
        } else if (number === "7") {
            return Avatar7
        } else if (number === "8") {
            return Avatar8
        } else if (number === "9") {
            return Avatar9
        } else if (number === "10") {
            return Avatar10
        } else if (number === "11") {
            return Avatar11
        } else if (number === "12") {
            return Avatar12
        } else if (number === "13") {
            return Avatar13
        } else if (number === "14") {
            return Avatar14
        } else if (number === "15") {
            return Avatar15
        } else {
            return Avatar16
        }
    }
}