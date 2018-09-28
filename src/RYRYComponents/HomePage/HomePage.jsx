import React from 'react';
import Modal from 'react-responsive-modal';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import CommunityListContainer from "./CommunityListContainer.jsx";
import '../../HomePage.css';
import UserCardDropDownContainer from "./UserCardDropDownContainer.jsx";
import NewsfeedContainer from "./NewsfeedContainer.jsx";
import CreateNewCommunityModal from "./CreateNewCommunityModal.jsx";
import CreateNewEventModal from "./CreateNewEventModal.jsx";

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

        this.state = {
            userFirstName: null,
            userLastName: null,
            communities: [],
            events: [],
            feeds: [],
            communityModalOpen: false,
            eventModalOpen: false,
            typeForModal: ''
        }
    }

    componentWillMount() {
        this.getUser();
        this.getUserFeeds();
        this.getCommunitiesAndEvents();

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
                    communities: content.communities,
                    events: content.events,
                })
            })
            .catch(err => {
                throw err
            });
    }

    getUserFeeds() {
        return fetch('feeds?feeds=' + this.props.userName, {
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
                console.log("fetching feeds succeeded")
                this.setState({
                    feeds: content.feeds,
                })
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
                console.log("fetching full name succeeded")
                this.setState({
                    userFirstName: content.firstName,
                    userLastName: content.lastName,
                })
            })
            .catch(err => {
                throw err
            });
    }

    render() {
        return (
            <div className="home-page-root">
                <div className="home-page-body">
                    <Modal open={this.state.communityModalOpen} onClose={this.onCloseModal}>
                        <CreateNewCommunityModal onCancel={this.onCloseModal} onCreateGroup={this.insertGroup} userName={this.props.userName}/>
                    </Modal>
                    <Modal open={this.state.eventModalOpen} onClose={this.onCloseModal}>
                        <CreateNewEventModal onCancel={this.onCloseModal} onCreateGroup={this.insertGroup} userName={this.props.userName}/>
                    </Modal>
                    <Row className="row-root">
                        <Col sm={{size: 'auto'}} className="user-col">
                            <Button onClick={this.insertGroup}></Button>
                            <div className="card-wrapper">
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
                                                                   invokeCreateNewEvent={this.onOpenModalEvent}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={{size: 6}} className="feeds-col">
                            <NewsfeedContainer myFeeds={this.state.feeds}/>
                        </Col>
                        <Col sm={{size: 'auto', offset: 1}} className="communities-col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>My Communities</CardHeader>
                                    <CardBody>
                                        <CommunityListContainer myType="communities" myCommunities={this.state.communities} invokeOnGroupClick={this.onGroupClick}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={{size: 'auto', offset: 1}} className="communities-col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>My Events</CardHeader>
                                    <CardBody>
                                        <CommunityListContainer myType="event" myCommunities={this.state.events} invokeOnGroupClick={this.onGroupClick}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    onGroupClick(groupName){
        this.props.showGroupPage(groupName);
    }

    userLogOut() {
        this.props.invokeDisplayLandingPage();
    }

    userProfileClick() {
        this.props.showUserProfile();
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
                    console.log("group inserted?")
                    return true;
                } else {
                    console.log("403 with addGroup")
                    return false;
                }
            });
    }

    onOpenModalCommunity(){
        this.setState({communityModalOpen: true})
    };

    onOpenModalEvent(){
        this.setState({eventModalOpen: true})
    }

    onCloseModal(){
        this.setState({communityModalOpen: false,
                        eventModalOpen: false})
    };
}