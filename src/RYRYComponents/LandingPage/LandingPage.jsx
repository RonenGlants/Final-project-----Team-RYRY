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
                <LoginPage nameChangeValidation={this.getUsernameErrorMessage.bind(this)}
                           passwordChangeValidation={this.getPasswordErrorMessage.bind(this)}
                           showSignUp={this.showSignUp.bind(this)}
                />
            );
        else
            return (
                <SignUpPage nameChangeValidation={this.getUsernameErrorMessage.bind(this)}
                            passwordChangeValidation={this.getPasswordErrorMessage.bind(this)}
                            showLogin={this.showLogin.bind(this)}
                            isSignupValid = {this.isSignupValid.bind(this)}
                />
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

    getUsernameErrorMessage(value) {
        if (!this.isUsernameValid(value))
            return "Needs at least 6 letters";
        else {
            return "";
        }
    }

    getPasswordErrorMessage(value) {
        if (!this.isPasswordValid(value))
            return "Needs at least 6 letters";
        else {
            return "";
        }
    }

    isSignupValid(username, password, email) {
        return this.isPasswordValid(password) && this.isUsernameValid(username) && this.isUsernameValid(email); // todo: handel email validation

    }

    isPasswordValid(value) {
        return value.length > 6;
    }

    isUsernameValid(value) {
        return value.length > 6;
    }
}
