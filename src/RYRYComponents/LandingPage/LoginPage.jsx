import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import loginLogoImage from '../Resources/LoginLogo.jpg';
import InputContainer from "../Containers/InputContainer.jsx";
import {Button, Card, CardBody, CardTitle, CardText, CardHeader, Row, Col} from 'reactstrap';

export default class LoginPage extends React.Component {
    constructor(args) {
        super(...args);
        this.handleLogin = this.handleLogin.bind(this);
        this.signUpButtonClick = this.signUpButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showLoginErrorMessage = this.showLoginErrorMessage.bind(this);

        this.state = {
            errMessage: "",
            password: "",
            email: "",
            redirect: false,
        }
    }

    render() {
            if(this.state.redirect){
                return(
                    <Redirect push to="/homepage"/>
                )
            }
            return(
            <Row className="login-page-wrapper">
                <Col sm={{size: 'auto', offset: 1}}>
                    <img className="login-logo" src={loginLogoImage}/>
                    <form onSubmit={this.handleLogin}>
                        <InputContainer myName="email" labelClassName="username-label" labelValue="Email" type="email"
                                        handleMyChange={this.handleChange}
                                        inputChangeValidation={this.props.nameChangeValidation}/>
                        <InputContainer myName="password" labelClassName="password-label" labelValue="Password" type="password"
                                        handleMyChange={this.handleChange}
                                        inputChangeValidation={this.props.passwordChangeValidation}/>
                        <Button color="primary" className="submit-btn btn" type="submit" value="Login">Login</Button>
                        <label className="errMessage">{this.state.errMessage}</label>
                    </form>
                </Col>
                <Col sm={{size: 'auto', offset: 1}} className="login-page-not-signed-yet">
                    <Card body outline color="primary" className="notSignedYetCard"
                          style={{width: "80%", height: "65%"}}>
                        <CardHeader tag="h3">Not signed yet?</CardHeader>
                        <CardBody>
                            <CardText>Join us to earn new skills and enrich others</CardText>
                            <CardText>
                                <small className="text-muted">It only takes a minute...</small>
                            </CardText>
                            <Button color="danger" onClick={this.signUpButtonClick}
                                    className="submit-btn btn" type="submit" value="SignUp">Sign Up</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }

    signUpButtonClick() {
        this.props.showSignUp();
    }

    handleLogin(loginClickEvent) {
        loginClickEvent.preventDefault(); // calls console.warn
        const userName = this.state.email;
        const userPassword = this.state.password;
        this.showLoginErrorMessage("");
        return fetch('/users/loginUser', {
            method: 'POST',
            body: JSON.stringify({userName: userName, userPassword: userPassword}),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("OK with loginUser");
                    this.props.loginSuccessHandler(userName, userPassword);
                    this.setState({redirect: true});
                } else {
                    console.log("403 with loginUser");
                    this.showLoginErrorMessage("Email or Password are incorrect.")
                }
            });
        return true;
    }

    handleChange(name, value){
        this.setState({[name]: value})
    }

    showLoginErrorMessage(error) {
        this.setState(() => ({
            errMessage: error,
        }));
    }
}

