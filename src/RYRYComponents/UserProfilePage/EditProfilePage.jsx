import React from 'react';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Fade, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import { Redirect } from 'react-router';

export default class UserProfilePage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            firstName: null,
            firstNameInput: false,

            lastName: null,
            lastNameInput: false,

            mySkills: [],
            mySkillsInput: false,

            gender: null,

            desiredSkills: [],
            desiredSkillsInput: false,

            redirect: false,
        }

        this.toggleFirstName = this.toggleFirstName.bind(this);
        this.toggleLastName = this.toggleLastName.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    componentWillMount() {
        this.getUser();
    }


    // todo: set props to states

    render() {
        if(this.state.redirect){
            return(
                <Redirect push to="/homepage"/>
            )
        }
        return (
            <Card>
                <CardHeader>
                    <Button><CardImg top width="20%" src={UserProfileLogo}/></Button>
                </CardHeader>
                <CardBody>
                    <Row>

                        <Col>First name: {this.state.firstName} </Col>
                        <Col>
                            <Button color="primary" onClick={this.toggleFirstName}>edit</Button>
                        </Col>
                        <Col>
                            <Fade in={this.state.firstNameInput} tag="h5" className="mt-3">
                                <form onSubmit={(clickEvent) =>
                                    this.setState({
                                        firstName: clickEvent.target.elements[0].value,
                                        firstNameInput: !this.state.firstName,
                                    })}>
                                    <input/>
                                    <Button color="primary" className="submit-btn btn" type="submit"
                                            value="submit">submit</Button>
                                </form>
                            </Fade>
                        </Col>

                    </Row>

                    <Row>
                        <Col>Last name: {this.state.lastName} </Col>
                        <Col>
                            <Button color="primary" onClick={this.toggleLastName}>edit</Button>
                        </Col>
                        <Col>
                            <Fade in={this.state.lastNameInput} tag="h5" className="mt-3">
                                <form onSubmit={(clickEvent) =>
                                    this.setState({
                                        lastName: clickEvent.target.elements[0].value,
                                        lastNameInput: !this.state.lastName,
                                    })}>
                                    <input/>
                                    <Button color="primary" className="submit-btn btn" type="submit"
                                            value="submit">submit</Button>
                                </form>
                            </Fade>
                        </Col>
                    </Row>

                    <Row>
                        <Col>Gender: {this.state.gender} </Col>
                    </Row>

                    <Button onClick={this.saveChanges} color="primary" className="submit-btn btn">Save changes</Button>

                </CardBody>
            </Card>
        )
    };


    getUser() {
        return fetch('users/user?userName=' + this.props.userName, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(content => {
                console.log("fetching full name succeeded")
                this.setState({
                    firstName : content.user.firstName,
                    lastName  : content.user.lastName,
                    gender    : content.user.gender,

                })
            })
            .catch(err => {
                throw err
            });
    }


    toggleFirstName() {
        this.setState({
            firstNameInput: !this.state.firstNameInput
        });
    }
    toggleLastName() {
        this.setState({
            lastNameInput: !this.state.lastNameInput
        });
    }

    saveChanges(){
        return fetch('/users/updateProfile', {
            method: 'POST',
            body: JSON.stringify({userName: this.props.userName, userPassword: this.props.password, lastName: this.state.lastName, firstName: this.state.lastName, desiredSkills: this.state.desiredSkills, gender: this.state.gender, mySkills: this.state.mySkills}),
            credentials: 'include'
        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("Profile update succeded");
                    this.setState({redirect: true});
                } else {
                    console.log("403 with profile update");
                    this.showLoginErrorMessage("Server isn't able to update profile");
                }
            });
    }

}