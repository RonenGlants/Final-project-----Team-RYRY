import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Card, CardBody, CardImg, CardText, CardHeader} from 'reactstrap';

export default class CommunityListContainer extends React.Component{
    constructor(args){
        super(...args);
        this.state ={

        }

    }

    render(){
        return(
            <div className="community">
                {this.props.myCommunities.map((community) => {
                    return <CardText className="community-each">{community}</CardText>
                })}
            </div>
        )
    };
}