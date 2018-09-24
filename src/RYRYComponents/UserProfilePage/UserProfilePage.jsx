import React from 'react';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Fade, Row} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'

export default class UserProfilePage extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            NewFirstName: null,
            NewFirstNameInput: false,

            NewLastName: null,
            NewLastNameInput: false,

            NewGender: null,
            NewGenderInput: false,

            NewSkills: [],
            NewSkillsInput: false,

            NewDesiredSkills: [],
            NewDesiredSkillsInput: false,
        }
        this.toggleFirstName = this.toggleFirstName.bind(this);
        this.toggleLastName = this.toggleLastName.bind(this);
    }

    componentWillMount() {
        this.setState({
            NewFirstName: this.props.userFirstName,
            NewLastName: this.props.userLastName,
        })
    }

    // todo: set props to states

    render() {
        return (
            <Card>
                <CardHeader>
                    <Button><CardImg top width="20%" src={UserProfileLogo}/></Button>
                </CardHeader>
                <CardBody>
                    <Row>

                            <Col>First name: {this.state.NewFirstName} </Col>
                            <Col>
                                <Button color="primary" onClick={this.toggleFirstName}>edit</Button>
                            </Col>
                        <Col>
                            <Fade in={this.state.NewFirstNameInput} tag="h5" className="mt-3">
                                <form onSubmit={(clickEvent) =>
                                    this.setState({
                                        NewFirstName: clickEvent.target.elements[0].value,
                                    })}>
                                    <input/>
                                    <Button color="primary" className="submit-btn btn" type="submit"
                                            value="submit">submit</Button>
                                </form>
                            </Fade>
                        </Col>

                    </Row>

                    <Row>
                            <Col>Last name: {this.state.NewLastName} </Col>
                            <Col>
                                <Button color="primary" onClick={this.toggleLastName}>edit</Button>
                            </Col>
                        <Col>
                            <Fade in={this.state.NewLastNameInput} tag="h5" className="mt-3">
                                <form onSubmit={(clickEvent) =>
                                    this.setState({
                                        NewLastName: clickEvent.target.elements[0].value,
                                    })}>
                                    <input/>
                                    <Button color="primary" className="submit-btn btn" type="submit"
                                            value="submit">submit</Button>
                                </form>
                            </Fade>
                        </Col>
                    </Row>

                    <Button color="primary" className="submit-btn btn">Save changes</Button>

                </CardBody>
            </Card>
        )
    };

    toggleFirstName() {
        this.setState({
            NewFirstNameInput: !this.state.NewFirstNameInput
        });
    }
    toggleLastName() {
        this.setState({
            NewLastNameInput: !this.state.NewLastNameInput
        });
    }
}
