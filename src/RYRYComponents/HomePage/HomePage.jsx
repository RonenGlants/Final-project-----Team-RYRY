import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Card, CardBody, CardImg, CardText, CardHeader, Row, Col} from 'reactstrap';
import HomePageLogo from '../Resources/HomePageLogo.jpg'
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import CommunityListContainer from "./CommunityListContainer.jsx";
import '../../HomePage.css';
import UserCardDropDownContainer from "./UserCardDropDownContainer.jsx";
import NewsfeedContainer from "./NewsfeedContainer.jsx";

export default class HomePage extends React.Component{
    constructor(args){
        super(...args);
        this.userLogOut = this.userLogOut.bind(this);
        this.userProfileClick = this.userProfileClick.bind(this);
        this.userSettingsClick = this.userSettingsClick.bind(this);

        this.state ={
            userFirstName: 'Dudu',
            userLastName: 'Faruk',
            communities: ["Nargila", "Armani", "Arak", "Beitar yerushalaim", "Nike"],
            feeds: ["DayOne", "DayTwo", "DayThree", "DayFour", "DayFive", "You see where this is going"],


        }
    }

    render(){
        return(
           <div className="home-page-root">
               <div className="home-page-body">
                    <Row className="row-root">
                        <Col sm={{size: 'auto'}} className="user-col">
                            <div className="card-wrapper">
                                <Card>
                                <CardHeader>
                                    <Button onClick={this.userProfileClick}><CardImg top width="100%" src={UserProfileLogo}/></Button>
                                            Hello, {this.state.userFirstName} {this.state.userLastName}
                                </CardHeader>
                                <CardBody>
                                    <UserCardDropDownContainer userName={this.state.userFirstName} invokeLogOut={this.userLogOut}
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
                            <CardHeader>My communities</CardHeader>
                            <CardBody>
                                <CommunityListContainer myCommunities={this.state.communities}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
           </div>
           </div>
        );
    }

    userLogOut(){
        this.props.invokeDisplayLandingPage();
    }

    userProfileClick(){
        this.props.showUserProfile();
    };

    userSettingsClick(){
        // todo: create a settingPage container and invoke basecontainer to render it by props
    }
}