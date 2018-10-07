import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import {BrowserRouter} from 'react-router-dom';


export default class LandingPage extends React.Component {

    constructor(args) {
        super(...args);
        this.loginType = "login";
        this.signUpType = "signUp";
        this.getEmptyErrorMessage = this.getEmptyErrorMessage.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showSignUp = this.showSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.isSignupValid = this.isSignupValid.bind(this);

        this.state = {
            type: this.loginType,
        }
    }

    render() {
        if (this.state.type == this.loginType)
            return (
                <LoginPage nameChangeValidation={this.getEmptyErrorMessage}
                           passwordChangeValidation={this.getEmptyErrorMessage}
                           showSignUp={this.showSignUp}
                           loginSuccessHandler={this.handleLogin}
                />
            );
        else
            return (
                <SignUpPage nameChangeValidation={this.getEmptyErrorMessage}
                            passwordChangeValidation={this.getEmptyErrorMessage}
                            showLogin={this.showLogin}
                            isSignupValid = {this.isSignupValid}
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

    handleLogin(userName, userPassword){
        this.props.handleAuthenticatedUser(userName, userPassword);
    }

    getEmptyErrorMessage(value) {
        if (!this.isUsernameValid(value))
            return "filed can not be empty";
        else {
            return "";
        }
    }

    isSignupValid(username, password, email) {
        return this.isPasswordValid(password) && this.isUsernameValid(username);
    }

    isPasswordValid(value) {
        return value.length >= 6;
    }

    isUsernameValid(value) {
        return value.length > 0;
    }
}
