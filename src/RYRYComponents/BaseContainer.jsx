import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import HomePage from './HomePage/HomePage.jsx';
import GroupPage from './GroupPage/GroupPage.jsx';
import UserProfilePage from './UserProfilePage/UserProfilePage.jsx'
import '../HomePage.css';

export default class BaseContainer extends React.Component{
    constructor(args){
        super(...args);
        this.landingPage = "landingPage";
        this.homePage = "homePage";
        this.groupPage = "groupPage";
        this.userProfilePage = "userProfilePage";

        this.userLoggedOut = this.userLoggedOut.bind(this);
        this.showUserProfile = this.showUserProfile.bind(this);
        this.showGroupPage = this.showGroupPage.bind(this);
        this.handleAuthenticatedUser = this.handleAuthenticatedUser.bind(this);

        this.state = {
            pageType: this.landingPage,
            userName: '',
            password: '',
            groupName: ''
        }
    }

    render(){
            if (this.state.pageType == this.landingPage)
                return(
                    <div className="landing-page-root">
                        <div className="home-page-menu">
                            <label className="home-page-ryry">RYRY</label>
                        </div>
                    <LandingPage handleAuthenticatedUser={this.handleAuthenticatedUser}/>
                    </div>

                );
            else if(this.state.pageType == this.homePage)
                return (
                    <div className="home-page-root">
                        <div className="home-page-menu">
                         <label className="home-page-ryry">RYRY</label>
                        </div>
                    <HomePage userName={this.state.userName} showUserProfile={this.showUserProfile} invokeDisplayLandingPage={this.userLoggedOut} showGroupPage={this.showGroupPage}/>
                    </div>
                );
            else if(this.state.pageType == this.userProfilePage)
                return (
                    <div className="user-profile-page-root">
                        <div className="home-page-menu">
                            <label className="home-page-ryry">RYRY</label>
                        </div>
                    <UserProfilePage/>
                    </div>
                );
            else if(this.state.pageType == this.groupPage)
                return(
                    <div className="home-page-root">
                        <div className="home-page-menu">
                            <label className="home-page-ryry">RYRY</label>
                        </div>
                        <GroupPage myName={this.state.groupName}/>
                    </div>
                );

    }

    handleAuthenticatedUser(userName, passWord){
        this.setState({pageType: this.homePage,
                       userName: userName,
                       password: passWord})
    }

    userLoggedOut(){
        this.setState({pageType: this.landingPage})
    }

    showGroupPage(groupName){
        this.setState({pageType: this.groupPage,
                        groupName: groupName})
    }

    showUserProfile(){
        this.setState(() => ({
            pageType: this.userProfilePage,
        }));
    }

    //todo: switching between landing page (after login/signup to homepage
    //todo: implement error page
}
