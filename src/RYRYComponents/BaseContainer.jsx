import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import HomePage from './HomePage/HomePage.jsx';
import UserProfilePage from './UserProfilePage/UserProfilePage.jsx'

export default class BaseContainer extends React.Component{
    constructor(args){
        super(...args);
        this.landingPage = "landingPage";
        this.homePage = "homePage";
        this.userProfilePage = "userProfilePage";

        this.userLoggedOut = this.userLoggedOut.bind(this);
        this.showUserProfile = this.showUserProfile.bind(this);

        this.state = {
            pageType: this.homePage,
        }
    }

    render(){
            if (this.state.pageType == this.landingPage)
                return(
                    <LandingPage/>
                );
            else if(this.state.pageType == this.homePage)
                return (
                    <HomePage showUserProfile={this.showUserProfile} invokeDisplayLandingPage={this.userLoggedOut}/>
                );
            else if(this.state.pageType == this.userProfilePage)
                return (
                    <UserProfilePage/>
                );
            else
                return(
                    <LandingPage/>
                );

    }

    userLoggedOut(){
        this.setState({pageType: this.landingPage})
    }

    showUserProfile(){
        this.setState(() => ({
            pageType: this.userProfilePage,
        }));
    }

    //todo: switching between landing page (after login/signup to homepage
    //todo: implement error page
}
