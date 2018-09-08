import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Card, CardBody, CardImg, CardText, CardHeader, Row, Col} from 'reactstrap';
import UserProfileLogo from '../Resources/UserProfileLogo.jpg'
import CommunityListContainer from "../HomePage/CommunityListContainer.jsx";

export default class UserProfilePage extends React.Component{
    constructor(args){
        super(...args);
        this.state={

        }
    }

    render(){
        return(
            <img src={UserProfileLogo}/>
        )
    };
}