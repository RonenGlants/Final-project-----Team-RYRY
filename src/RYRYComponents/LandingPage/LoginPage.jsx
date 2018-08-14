import React from 'react';
import ReactDOM from 'react-dom';
import loginLogoImage from '../Resources/LoginLogo.jpg';
import InputContainer from "./InputContainer.jsx";

export default class LoginPage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            errMessage: "",
        }
    }

    render() {
        return (
            <div className="login-page-wrapper">
                <img className="login-logo" src={loginLogoImage}/>
                <form onSubmit={this.handleLogin}>
                   <InputContainer labelClassName="username-label" labelValue="Name" type="text" inputChangeValidation={this.props.nameChangeValidation}/>
                    <br/>
                    <InputContainer labelClassName="password-label" labelValue="Password" type="password" inputChangeValidation={this.props.passwordChangeValidation}/>
                    <br/>
                    <input className="submit-btn btn" type="submit" value="Login"/>
                </form>
                <input onClick={this.signUpButtonClick.bind(this)} className="submit-btn btn" type="submit" value="SignUp"/>
            </div>
        );
    }

    signUpButtonClick(){
        this.props.showSignUp();
    }

    handleLogin(eventLoginClick) {
        eventLoginClick.preventDefault(); // calls console.warn
        const userName = eventLoginClick.target.elements.userName.value; // target is the form elements are the labels
        const userPassword = eventLoginClick.target.elements.userPassword.value;
        return fetch('/users/loginUser', {method:'POST', body: {userName: userName, userPassword: userPassword}, credentials: 'include'})
            .then(response=> {        // response is the result
                if (response.ok){      // ok == 200
                    this.setState(()=> ({errMessage: ""}));
                    this.props.loginSuccessHandler();
                } else {
                    if (response.status === 403) {
                        //todo: handle error
                        this.setState(()=> ({errMessage: "User name already exist, please try another one"}));
                    }
                    this.props.loginErrorHandler();
                }
            });
        return true;
        //TODO: implement fetch(authentication)
    }
}

