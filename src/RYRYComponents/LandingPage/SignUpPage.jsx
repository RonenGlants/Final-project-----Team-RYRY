import React from 'react';
import SignUpLogoImage from '../Resources/SignUpLogo.jpg';
import InputContainer from "../Containers/InputContainer.jsx";
import RadioContainer from "../Containers/RadioContainer.jsx";
import './Style/LandingPage.css';
import SkillsInputContainer from '../Containers/SkillsInputContainer.jsx';
import {Button, Card, CardBody, CardHeader, Row, Col, CardText} from 'reactstrap';

export default class SignUpPage extends React.Component {
    constructor(args) {
        super(...args);
        this.signUpButtonClick = this.signUpButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signInButtonClick = this.signInButtonClick.bind(this);
        this.showSignUpErrorMessage = this.showSignUpErrorMessage.bind(this);


        this.state = {
            errMessage: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            gender: "Male",
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
                            <InputContainer myName="firstName" labelClassName="username-label" labelValue="First Name"
                                            type="text" handleMyChange={this.handleChange}
                                            inputChangeValidation={this.props.nameChangeValidation}/>
                            <InputContainer myName="lastName" labelClassName="username-label" labelValue="Last Name"
                                            type="text" handleMyChange={this.handleChange}
                                            inputChangeValidation={this.props.nameChangeValidation}/>
                            <InputContainer myName="password" ref="password-container" labelClassName="password-label"
                                            labelValue="Password" type="password" handleMyChange={this.handleChange}
                                            inputChangeValidation={this.props.passwordChangeValidation}/>
                            <InputContainer myName="email" ref="email-container" labelClassName="mail-label"
                                            labelValue="Email" type="email" handleMyChange={this.handleChange}/>
                            <RadioContainer myName="gender" choiceTitle="Gender" choiceOptions={genderOptions}
                                            handleMyChange={this.handleChange}/>
                            <Row>
                                <SkillsInputContainer tags={[]} ref={(mySkillsCont) => {
                                    window.mySkillsCont = mySkillsCont
                                }} skillsTitle="My Skills"/>
                                <SkillsInputContainer tags={[]} ref={(desiredSkillsCont) => {
                                    window.desiredSkillsCont = desiredSkillsCont
                                }} skillsTitle="My Desired Skills"/>
                            </Row>
                            <input className="submit-btn btn" type="submit" value="Sign Up"/>
                            <label className="errMessage">{this.state.errMessage}</label>
                        </form>
                    </Col>
                    <Col>
                        <Card body outline color="primary" className="alredySignedUpCard"
                              style={{width: "60%", height: "40%"}}>
                            <CardHeader tag="h3">Already signed up?</CardHeader>
                            <CardBody>
                                <CardText>Let's earn new skills and enrich others!</CardText>
                                <Button color="danger" onClick={this.signInButtonClick}
                                        className="submit-btn btn" type="submit" value="SignIn">Sign In</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }


    signUpButtonClick() {
        //signUpClickEvent.preventDefault(); // calls console.warn
        const firstName = this.state.firstName; // target is the form elements are the labels
        const lastName = this.state.lastName;
        const password = this.state.password;
        const email = this.state.email;
        const gender = this.state.gender;
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
            avatarNumber: "1",
        }
        if (this.props.isSignupValid(newUser.userName, newUser.password)) {
            return fetch('/users/signUpUser', {
                method: 'POST',
                body: JSON.stringify({newUser}),
                credentials: 'include'
            }).then(response => {        // response is the result
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

    handleChange(name, value) {
        this.setState({[name]: value})
    }

}