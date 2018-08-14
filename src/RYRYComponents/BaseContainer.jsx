import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage/LandingPage.jsx';

export default class BaseContainer extends React.Component{
    constructor(args){
        super(...args);
        this.landingPage = "landingPage";

        this.state = {
            pageType: this.landingPage,
        }
    }

    render(){
        return(
            <LandingPage/>
        );
    }

}
