import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';


export default class LandingPage extends React.Component {

    constructor(args) {
        super(...args);
        this.loginType = "login";
        this.signUpType = "signUp";

        this.state = {
            type: this.loginType,
        }

    }

    render() {
        if (this.state.type == this.loginType)
            return (
                <LoginPage nameChangeValidation={this.validateUsername.bind(this)}
                           passwordChangeValidation={this.validatePassword.bind(this)}
                           showSignUp={this.showSignUp.bind(this)}/>
            );
        else
            return (
                <SignUpPage nameChangeValidation={this.validateUsername.bind(this)}
                            passwordChangeValidation={this.validatePassword.bind(this)}
                            showLogin={this.showLogin.bind(this)}/>
            );
    }

    showSignUp() {
        this.setState(() => ({
            type: this.signUpType,
        }));
    }

    showLogin() {
        this.setState(() => ({
            type: this.loginType,
        }));
    }

    validateUsername(value) {
        return value + "1";
    }

    validatePassword(value) {
        return value + "2";
    }

}
