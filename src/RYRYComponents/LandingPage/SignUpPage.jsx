import React from 'react';
import ReactDOM from 'react-dom';
import SignUpLogoImage from '../Resources/SignUpLogo.jpg';
import InputContainer from "./Containers/InputContainer.jsx";
import RadioContainer from "./Containers/RadioContainer.jsx";
import './Style/LandingPage.css';
import SkillsInputContainer from './Containers/SkillsInputContainer.jsx';

export default class SignUpPage extends React.Component {
    constructor(args) {
        super(...args);
        this.signUpButtonClick = this.signUpButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            errMessage: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            gender: '',
        }
    }

    render() {
    var genderOptions = ["Male","Female"];
        return (
            <div className="login-page-wrapper">
                <form className="signup-form" onSubmit={this.signUpButtonClick}>
                    <img className="signup-logo" src={SignUpLogoImage}/>
                    <InputContainer myName="firstName" labelClassName="username-label" labelValue="First Name" type="text" handleMyChange={this.handleChange} inputChangeValidation={this.props.nameChangeValidation}/>
                    <InputContainer myName="lastName" labelClassName="username-label" labelValue="Last Name" type="text" handleMyChange={this.handleChange} inputChangeValidation={this.props.nameChangeValidation}/>
                    <InputContainer myName="password" ref="password-container" labelClassName="password-label" labelValue="Password" type="password" handleMyChange={this.handleChange} inputChangeValidation={this.props.passwordChangeValidation}/>
                    <InputContainer myName="email" ref="email-container" labelClassName="mail-label" labelValue="Email" type="email" handleMyChange={this.handleChange}/>
                    <RadioContainer choiceTitle="Gender" choiceOptions={genderOptions}/>
                    <SkillsInputContainer skillsTitle="My Skills"/>
                    <SkillsInputContainer skillsTitle="My Desired Skills"/>
                    <input className="submit-btn btn" type="submit" value="Sign Up"/>
                    <label className="errMessage">{this.state.errMessage}</label>
                </form>
            </div>
        );
    }

    signUpButtonClick(signUpClickEvent) {
        signUpClickEvent.preventDefault(); // calls console.warn
        const userName = this.state.email;
        const userPassword = this.state.password;
        //const userName = signUpClickEvent.target.elements[3].value; // target is the form elements are the labels
        //const userPassword = signUpClickEvent.target.elements[2].value;

        if (this.props.isSignupValid(userName, userPassword)) {
            return fetch('/users/signUpUser', {
                method: 'POST',
                body: JSON.stringify({userName: userName, userPassword: userPassword}),
                credentials: 'include'
            })
                .then(response => {        // response is the result
                    if (response.ok) {      // ok == 200
                        console.log("signup success - going to showLogin")
                        this.props.showLogin();
                    } else {
                        console.log("sign up fetch failed: response not ok")
                        this.showSignUpErrorMessage("Email is taken. please try another email.");
                    }
                });
        }
        else {
            this.showSignUpErrorMessage("Please fill all the information as required.");
        }
    }

    showSignUpErrorMessage(error) {
        this.setState(() => ({
            errMessage: error,
        }));
    }

    handleChange(name, value){
        this.setState({[name]: value})
    }

}