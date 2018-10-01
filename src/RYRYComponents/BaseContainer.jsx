import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, withRouter  } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import HomePage from './HomePage/HomePage.jsx';
import GroupPage from './GroupPage/GroupPage.jsx';
import EditProfilePage from './UserProfilePage/EditProfilePage.jsx'
import '../HomePage.css';

export default class BaseContainer extends React.Component{
    constructor(args) {
        super(...args);
        this.landingPage = "landingPage";
        this.homePage = "homePage";
        this.groupPage = "groupPage";
        this.editProfilePage = "editProfilePage";

        this.userLoggedOut = this.userLoggedOut.bind(this);
        this.showUserProfile = this.showUserProfile.bind(this);
        this.showGroupPage = this.showGroupPage.bind(this);
        this.handleAuthenticatedUser = this.handleAuthenticatedUser.bind(this);

        this.state = {
            pageType: this.landingPage,
            userName: '',
            password: '',
            groupName: '',
            group: null

        };
    }
    render(){
        return(
            <div className="base-container-root">
                <div className="base-container-menu">
                    <label className="home-page-ryry">RYRY</label>
                </div>
                <Switch>
                    <Route exact path="/" render={() => <LandingPage handleAuthenticatedUser={this.handleAuthenticatedUser}/>}/>
                    <Route path="/homepage" render={() => <HomePage userName={this.state.userName} showUserProfile={this.showUserProfile} invokeDisplayLandingPage={this.userLoggedOut} showGroupPage={this.showGroupPage}/>}/>
                    <Route path="/editprofile" render={() => <EditProfilePage userName={this.state.userName} password={this.state.password} />}/>
                    <Route path="/grouppage" render={() => <GroupPage {...this.state.group}/>}/>
                </Switch>
            </div>
        )
    }

    handleAuthenticatedUser(userName, passWord){
        this.setState({pageType: this.homePage,
                       userName: userName,
                       password: passWord});
    }

    userLoggedOut(){
        this.setState({pageType: this.landingPage})
    }

    showGroupPage(groupName, group){
        this.setState({pageType: this.groupPage,
                        groupName: groupName,
                        group: group})
    }

    showUserProfile(){
        this.setState(() => ({
            pageType: this.editProfilePage,
        }));
    }

    //todo: switching between landing page (after login/signup to homepage
    //todo: implement error page
}

