import React from 'react';
import Modal from 'react-responsive-modal';
import FriendsListContainer from './FriendsListContainer.jsx';
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, CardFooter, Col, Row} from 'reactstrap';
import {BrowserRouter} from 'react-router-dom';


export default class GroupPage extends React.Component{
    constructor(args){
        super(...args);

        this.state={

        }
    }

    componentDidMount(){
        BrowserRouter.push('/grouppage');
    }

    render(){
        return(
            <div>
                <Card>
                    <CardHeader>Group name: {this.props.name}</CardHeader>
                    <CardBody>
                        <CardTitle>Admin: {this.props.manager}</CardTitle>
                        <CardSubtitle>Description: {this.props.description}</CardSubtitle>
                    </CardBody>
                </Card>
                <br/>
                <Card>
                    <CardHeader>Friends List</CardHeader>
                    <CardBody>
                        <FriendsListContainer myFriends={this.props.friends}/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}