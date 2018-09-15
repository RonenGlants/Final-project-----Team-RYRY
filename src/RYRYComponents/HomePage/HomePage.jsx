import React from 'react';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import CommunityListContainer from "./CommunityListContainer.jsx";
import '../../HomePage.css';
import UserCardDropDownContainer from "./UserCardDropDownContainer.jsx";
import NewsfeedContainer from "./NewsfeedContainer.jsx";

export default class HomePage extends React.Component {
    constructor(args) {
        super(...args);
        this.userLogOut = this.userLogOut.bind(this);
        this.userProfileClick = this.userProfileClick.bind(this);
        this.userSettingsClick = this.userSettingsClick.bind(this);

        this.state = {
            userFirstName: null,
            userLastName: null,
            communities: [],
            events: [],
            feeds: [],
        }
    }

    componentWillMount() {
        this.setState({userFirstName: this.props.userName})
        this.getUserName();
        this.getUserFeeds();
        this.getCommunitiesAndEvents();

    }

    getCommunitiesAndEvents() {;
       }

    getUserFeeds() {;
//todo:
    }

    getUserName() {
        return fetch('/users/fullName', {
            method: 'GET',
            body: JSON.stringify({userName: this.props.userName}),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("fetching full name succeeded")
                    this.setState({userFirstName: response.firstName})
                } else {
                    console.log("fetching full name failed: response not ok")
                    //todo: handle error( if possible)
                }
            });
    }

    render() {
        return (
            <div className="home-page-root">
                <div className="home-page-body">
                    <Row className="row-root">
                        <Col sm={{size: 'auto'}} className="user-col">
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
                                                                   invokeSettingsPage={this.userSettingsClick}/>
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
                                        <CommunityListContainer myCommunities={this.state.communities}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                        <Col sm={{size: 'auto', offset: 1}} className="communities-col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>My Events</CardHeader>
                                    <CardBody>
                                        <CommunityListContainer myCommunities={this.state.events}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    userLogOut() {
        this.props.invokeDisplayLandingPage();
    }

    userProfileClick() {
        this.props.showUserProfile();
    };

    userSettingsClick() {
        // todo: create a settingPage container and invoke basecontainer to render it by props
    }
}