import React from 'react';
import ReactDOM from 'react-dom';
import loginLogoImage from '../Resources/LoginLogo.jpg';
import InputContainer from "./InputContainer.jsx";
import {Button, Card, CardBody, CardTitle, CardText, CardHeader, Row, Col} from 'reactstrap';

export default class LoginPage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            errMessage: "",
        }
    }

    render() {
        return (
            <Row className="login-page-wrapper">
               <Col sm={{ size: 'auto', offset: 1}}>
                <img className="login-logo" src={loginLogoImage}/>
                <form onSubmit={this.handleLogin}>
                   <InputContainer labelClassName="username-label" labelValue="Name" type="text" inputChangeValidation={this.props.nameChangeValidation}/>
                    <InputContainer labelClassName="password-label" labelValue="Password" type="password" inputChangeValidation={this.props.passwordChangeValidation}/>
                    <Button color="primary" className="submit-btn btn" type="submit" value="Login">Login</Button>
                </form>
                </Col>
                <Col sm={{ size: 'auto', offset: 1}} className="login-page-not-signed-yet">
                    <Card body outline color="primary" className="notSignedYetCard" style={{width:"80%", height:"60%"}}>
                        <CardHeader tag="h3">Not signed yet?</CardHeader>
                        <CardBody>
                            <CardText>Join us to earn new skills and enrich others</CardText>
                            <CardText>
                                <small className="text-muted">It only takes a minute...</small>
                            </CardText>
                            <Button color="danger" onClick={this.signUpButtonClick.bind(this)} className="submit-btn btn" type="submit" value="SignUp">Sign Up</Button>
                        </CardBody>
                      </Card>
                </Col>
            </Row>
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

