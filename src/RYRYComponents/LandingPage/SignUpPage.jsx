import React from 'react';
import SignUpLogoImage from '../Resources/SignUpLogo.jpg';
import InputContainer from "./Containers/InputContainer.jsx";
import RadioContainer from "./Containers/RadioContainer.jsx";
import './Style/LandingPage.css';
import SkillsInputContainer from './Containers/SkillsInputContainer.jsx';
import {Button, Card, CardBody, CardHeader,Row, Col} from 'reactstrap';

export default class SignUpPage extends React.Component {
    constructor(args) {
        super(...args);
        this.signUpButtonClick = this.signUpButtonClick.bind(this);
        this.signInButtonClick = this.signInButtonClick.bind(this);
        this.state = {
            errMessage: '',
        }
    }

    render() {
        var genderOptions = ["Male", "Female"];
        return (
            <div className="signup-page-wrapper">
                <Row>
                    <Col sm={{size: 'auto', offset: 1}}>
                        <form className="signup-form" onSubmit={this.signUpButtonClick}>
                            <img className="signup-logo" src={SignUpLogoImage}/>
                            <InputContainer labelClassName="username-label" labelValue="First Name" type="text"
                                            inputChangeValidation={this.props.nameChangeValidation}/>
                            <InputContainer labelClassName="username-label" labelValue="Last Name" type="text"
                                            inputChangeValidation={this.props.nameChangeValidation}/>
                            <InputContainer labelClassName="password-label" labelValue="Password" type="password"
                                            inputChangeValidation={this.props.passwordChangeValidation}/>
                            <InputContainer labelClassName="mail-label" labelValue="Email" type="email"
                                            placeholder="ronen@RYRY.com"/>
                            <RadioContainer choiceTitle="Gender" choiceOptions={genderOptions}/>
                            <SkillsInputContainer ref={(mySkillsCont) => {
                                window.mySkillsCont = mySkillsCont
                            }} skillsTitle="My Skills"/>
                            <SkillsInputContainer ref={(desiredSkillsCont) => {
                                window.desiredSkillsCont = desiredSkillsCont
                            }} skillsTitle="My Desired Skills"/>
                            <input className="submit-btn btn" type="submit" value="Sign Up"/>
                            <label className="errMessage">{this.state.errMessage}</label>
                        </form>
                    </Col>
                    <Col>
                        <Card body outline color="primary" className="alredySignedUpCard"
                              style={{width: "80%", height: "60%"}}>
                            <CardHeader tag="h3">Already signed up</CardHeader>
                            <CardBody>
                                <Button color="danger" onClick={this.signInButtonClick}
                                        className="submit-btn btn" type="submit" value="SignIn">Sign In</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }


    signUpButtonClick(signUpClickEvent) {
        signUpClickEvent.preventDefault(); // calls console.warn
        const firstName = signUpClickEvent.target.elements[0].value; // target is the form elements are the labels
        const lastName = signUpClickEvent.target.elements[1].value;
        const password = signUpClickEvent.target.elements[2].value;
        const email = signUpClickEvent.target.elements[3].value;
        const gender = signUpClickEvent.target.elements[4].checked ? signUpClickEvent.target.elements[4].value : signUpClickEvent.target.elements[5].value;
        const mySkills = window.mySkillsCont.getTags();
        const desiredSkills = window.desiredSkillsCont.getTags();
        const newUser = {
            userName: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            gender: gender,
            mySkills: mySkills,
            desiredSkills: desiredSkills,
        }
        if (this.props.isSignupValid(newUser.userName, newUser.password)) {
            return fetch('/users/signUpUser', {
                method: 'POST',
                body: JSON.stringify({newUser}),
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

    signInButtonClick() {
        this.props.showLogin();
    }

    showSignUpErrorMessage(error) {
        this.setState(() => ({
            errMessage: error,
        }));
    }
}