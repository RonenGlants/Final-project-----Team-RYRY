import React from 'react';
import {Redirect} from 'react-router';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Fade, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import SkillsInputContainer from "../Containers/SkillsInputContainer.jsx";

export default class UserProfilePage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            firstName: null,
            firstNameInput: false,

            lastName: null,
            lastNameInput: false,

            gender: null,

            mySkills: [],
            desiredSkills: [],

            desiredSkillsInput: false,

            redirect: false,

        }

        this.toggleFirstName = this.toggleFirstName.bind(this);
        this.toggleLastName = this.toggleLastName.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.getUser();
    }


    componentDidMount() {
        this.setState({
            mySkills: this.state.mySkills,
        })
    }

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
                        <Col>
                            First name: {this.state.firstName}
                            <br/>
                            <Button color="primary" onClick={this.toggleFirstName}>Edit</Button>
                        </Col>
                        <Col>
                            <Fade in={this.state.firstNameInput} tag="h5" className="mt-3">
                                <form>
                                    <input onChange={(event) =>
                                        this.setState({
                                            firstName: event.target.value,
                                        })}/>
                                  </form>
                            </Fade>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            Last name: {this.state.lastName}
                            <br/>
                            <Button color="primary" onClick={this.toggleLastName}>Edit</Button>
                        </Col>

                        <Col>
                            <Fade in={this.state.lastNameInput} tag="h5" className="mt-3">
                                <form >
                                    <input onChange={(event) =>
                                        this.setState({
                                            lastName: event.target.value,
                                        })}/>
                                </form>
                            </Fade>
                        </Col>
                    </Row>

                    <Row>
                        <Col>Gender: {this.state.gender}
                            <br/>
                            <Button color="primary" onClick={this.handleChange}>Change
                            </Button>
                        </Col>
                    </Row>

                    <br/>
                    <Row>
                        <Col>
                            <SkillsInputContainer mySkills = {true} userName = {this.props.userName} newUser = {false} tags={this.state.mySkills} ref={(mySkillsCont) => {
                                window.mySkillsCont = mySkillsCont
                            }} skillsTitle="My Skills"/>
                            <SkillsInputContainer desiredSkills = {true} userName = {this.props.userName} getUser = {this.getUser} newUser = {false} tags={this.state.desiredSkills} ref={(desiredSkillsCont) => {
                                window.desiredSkillsCont = desiredSkillsCont
                            }} skillsTitle="My Desired Skills"/>
                        </Col>
                    </Row>

                    <Button onClick={this.saveChanges} color="primary" className="submit-btn btn">Save changes</Button>

                </CardBody>
            </Card>
        )
    };

    handleChange() {
        this.setState({
            gender: this.state.gender == "Male" ? "Female" : "Male"
        });
        this.setState({gender: this.state.gender == "Male" ? "Female" : "Male"})
    }

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
                    firstName: content.user.firstName,
                    lastName: content.user.lastName,
                    gender: content.user.gender,
                    mySkills: content.mySkills,
                    desiredSkills: content.desiredSkills,
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

    saveChanges() {
        return fetch('/users/updateProfile', {
            method: 'POST',
            body: JSON.stringify({
                userName: this.props.userName,
                userPassword: this.props.password,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                mySkills: window.mySkillsCont.getTags(),
                desiredSkills: window.desiredSkillsCont.getTags(),
                gender: this.state.gender,
            }),
            credentials: 'include'


        })
            .then(response => {        // response is the result
                if (response.ok) {      // ok == 200
                    console.log("Profile update succeded");
                    this.setState({redirect: true});
                } else {
                    console.log("403 with profile update")
                }
            });
    }
}