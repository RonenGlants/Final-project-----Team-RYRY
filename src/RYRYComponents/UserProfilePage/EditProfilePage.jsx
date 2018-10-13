import React from 'react';
import {Redirect} from 'react-router';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Fade, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import Avatar1 from '../Resources/avatar1.jpeg';
import Avatar2 from '../Resources/avatar2.jpeg';
import Avatar3 from '../Resources/avatar3.jpeg';
import Avatar4 from '../Resources/avatar4.jpeg';
import Avatar5 from '../Resources/avatar5.jpeg';
import Avatar6 from '../Resources/avatar6.jpeg';
import Avatar7 from '../Resources/avatar7.jpeg';
import Avatar8 from '../Resources/avatar8.jpeg';
import Avatar9 from '../Resources/avatar9.jpeg';
import Avatar10 from '../Resources/avatar10.jpeg';
import Avatar11 from '../Resources/avatar11.jpeg';
import Avatar12 from '../Resources/avatar12.jpeg';
import Avatar13 from '../Resources/avatar13.jpeg';
import Avatar14 from '../Resources/avatar14.jpeg';
import Avatar15 from '../Resources/avatar15.jpeg';
import Avatar16 from '../Resources/avatar16.jpeg';

import SkillsInputContainer from "../Containers/SkillsInputContainer.jsx";
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import '../HomePage/HomePage.css';

const avatar1 = <img className="avatar-img" name="Avatar1" src={Avatar1}/>;
const avatar2 = <img className="avatar-img" name="Avatar2" src={Avatar2}/>;
const avatar3 = <img className="avatar-img" name="Avatar3" src={Avatar3}/>;
const avatar4 = <img className="avatar-img" name="Avatar4" src={Avatar4}/>;
const avatar5 = <img className="avatar-img" name="Avatar5" src={Avatar5}/>;
const avatar6 = <img className="avatar-img" name="Avatar6" src={Avatar6}/>;
const avatar7 = <img className="avatar-img" name="Avatar7" src={Avatar7}/>;
const avatar8 = <img className="avatar-img" name="Avatar8" src={Avatar8}/>;
const avatar9 = <img className="avatar-img" name="Avatar9" src={Avatar9}/>;
const avatar10 = <img className="avatar-img" name="Avatar10" src={Avatar10}/>;
const avatar11 = <img className="avatar-img" name="Avatar11" src={Avatar11}/>;
const avatar12 = <img className="avatar-img" name="Avatar12" src={Avatar12}/>;
const avatar13 = <img className="avatar-img" name="Avatar13" src={Avatar13}/>;
const avatar14 = <img className="avatar-img" name="Avatar14" src={Avatar14}/>;
const avatar15 = <img className="avatar-img" name="Avatar15" src={Avatar15}/>;
const avatar16 = <img className="avatar-img" name="Avatar16" src={Avatar16}/>;

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

            path: '/RYRYComponents/Resources/avatar1.jpeg',
            myAvatar: avatar1,

        };


        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.toggleFirstName = this.toggleFirstName.bind(this);
        this.toggleLastName = this.toggleLastName.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.getUser();
        this.setMyAvatar();
    }


    componentDidMount() {
        this.setState({
            mySkills: this.state.mySkills,
        })
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect push to="/homepage"/>
            )
        }
        return (
            <Card>
                <CardHeader>
                    <Button>{this.state.myAvatar}</Button>
                </CardHeader>
                <CardBody>
                    <Row>
                        <img className="avatar-img" name="Avatar1" src={Avatar1} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar2" src={Avatar2} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar3" src={Avatar3} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar4" src={Avatar4} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar5" src={Avatar5} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar6" src={Avatar6} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar7" src={Avatar7} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar8" src={Avatar8} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar9" src={Avatar9} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar10" src={Avatar10} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar11" src={Avatar11} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar12" src={Avatar12} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar13" src={Avatar13} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar14" src={Avatar14} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar15" src={Avatar15} onClick={this.onAvatarClick}/>
                        <img className="avatar-img" name="Avatar16" src={Avatar16} onClick={this.onAvatarClick}/>
                    </Row>
                    <Row className="edit-profile-row">
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

                    <Row className="edit-profile-row">
                        <Col>
                            Last name: {this.state.lastName}
                            <br/>
                            <Button color="primary" onClick={this.toggleLastName}>Edit</Button>
                        </Col>

                        <Col>
                            <Fade in={this.state.lastNameInput} tag="h5" className="mt-3">
                                <form>
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

                        <SkillsInputContainer myClass="skills-top" mySkills={true} userName={this.props.userName}
                                              newUser={false} tags={this.state.mySkills} ref={(mySkillsCont) => {
                            window.mySkillsCont = mySkillsCont
                        }} skillsTitle="My Skills"/>
                        <SkillsInputContainer myClass="skills-bottom" desiredSkills={true}
                                              userName={this.props.userName} getUser={this.getUser} newUser={false}
                                              tags={this.state.desiredSkills} ref={(desiredSkillsCont) => {
                            window.desiredSkillsCont = desiredSkillsCont
                        }} skillsTitle="My Desired Skills"/>

                    </Row>

                    <Button onClick={this.saveChanges} color="primary" className="submit-btn btn">Save changes</Button>

                </CardBody>
            </Card>
        )
    };

    onAvatarClick(element) {
        var avatar = this.getAvatarByNumber(
            element.target.name.replace( /^\D+/g, '')  // get stringed number
        );

        this.setState({myAvatar: avatar});
    }


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

    setMyAvatar() {
        this.state.myAvatar = this.props.avatarNumber
    }

    getAvatarByNumber(number) {
        if (number === "1") {
            return avatar1
        } else if (number === "2") {
            return avatar2
        } else if (number === "3") {
            return avatar3
        } else if (number === "4") {
            return avatar4
        } else if (number === "5") {
            return avatar5
        } else if (number === "6") {
            return avatar6
        } else if (number === "7") {
            return avatar7
        } else if (number === "8") {
            return avatar8
        } else if (number === "9") {
            return avatar9
        } else if (number === "10") {
            return avatar10
        } else if (number === "11") {
            return avatar11
        } else if (number === "12") {
            return avatar12
        } else if (number === "13") {
            return avatar13
        } else if (number === "14") {
            return avatar14
        } else if (number === "15") {
            return avatar15
        } else {
            return avatar16
        }
    }
}