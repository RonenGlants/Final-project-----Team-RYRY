import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';


export default class LandingPage extends React.Component {

    constructor(args) {
        super(...args);
        this.loginType = "login";
        this.signUpType = "signUp";
        this.getPasswordErrorMessage = this.getPasswordErrorMessage.bind(this);
        this.getUsernameErrorMessage = this.getUsernameErrorMessage.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showSignUp = this.showSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.isSignupValid = this.isSignupValid.bind(this);

        this.state = {
            type: this.signUpType,
        }

    }

    render() {
        if (this.state.type == this.loginType)
            return (
                <LoginPage nameChangeValidation={this.getUsernameErrorMessage}
                           passwordChangeValidation={this.getPasswordErrorMessage}
                           showSignUp={this.showSignUp}
                           loginSuccessHandler={this.handleLogin}
                />
            );
        else
            return (
                <SignUpPage nameChangeValidation={this.getUsernameErrorMessage}
                            passwordChangeValidation={this.getPasswordErrorMessage}
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
