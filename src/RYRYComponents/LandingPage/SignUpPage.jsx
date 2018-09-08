import React from 'react';
import ReactDOM from 'react-dom';
import SignUpLogoImage from '../Resources/SignUpLogo.jpg';
import InputContainer from "./InputContainer.jsx";
import './LandingPage.css';

export default class SignUpPage extends React.Component {
    constructor(args) {
        super(...args);

    }

    render() {
        return (
            <div className="login-page-wrapper">
                <form className="signup-form" onSubmit={this.signUpButtonClick.bind(this)}>
                    <img className="signup-logo" src={SignUpLogoImage}/>
                    <InputContainer labelClassName="username-label" labelValue="Name" type="text"
                                    inputChangeValidation={this.props.nameChangeValidation}/>
                    <InputContainer labelClassName="password-label" labelValue="Password" type="password"
                                    inputChangeValidation={this.props.passwordChangeValidation}/>
                    <InputContainer labelClassName="mail-label" labelValue="Email" type="email"
                                    placeholder="ronen@RYRY.com"
                                    inputChangeValidation={this.props.passwordChangeValidation}/>
                    <label className="gender-label">Gender: </label>
                    <label>
                        <input type="radio" name="gender" value="male" defaultChecked/> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female"/> Female
                    </label>
                    <br/>
                    <input className="submit-btn btn" type="submit" value="Sign Up"/>
                </form>
            </div>
        );
    }

    signUpButtonClick(signUpClickEvent){
        signUpClickEvent.preventDefault(); // calls console.warn
        const userName = signUpClickEvent.target.elements[0].value; // target is the form elements are the labels
        const userPassword = signUpClickEvent.target.elements[1].value;
        const email = signUpClickEvent.target.elements[2].value;

        if(this.props.isSignupValid(userName, userPassword, email))
        {
            return fetch('/users/signUpUser', {
                method: 'POST',
                body: JSON.stringify({userName: userName, userPassword: userPassword}),
                credentials: 'include'
            })
                .then(response => {        // response is the result
                    if (response.ok) {      // ok == 200
                        this.props.showLogin();
                    } else {
                        console.log("sign up fetch failed: response not ok")
                    }
                });
        }
    }
}
        // todo : "on submit form"
// todo: validateMAIL