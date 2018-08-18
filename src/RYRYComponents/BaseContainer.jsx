import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage/LandingPage.jsx';
import HomePage from './HomePage.jsx';
import UserProfilePage from './UserProfilePage.jsx'

export default class BaseContainer extends React.Component{
    constructor(args){
        super(...args);
        this.landingPage = "landingPage";
        this.homePage = "homePage";
        this.userProfilePage = "userProfilePage";

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
                    <HomePage showUserProfile={this.showUserProfile.bind(this)}/>
                );
            else //(this.state.pageType == this.userProfilePage)
                return (
                    <UserProfilePage/>
                );
    }

    showUserProfile(){
        this.setState(() => ({
            pageType: this.userProfilePage,
        }));
    }

    //todo: switching between landing page (after login/signup to homepage

}
