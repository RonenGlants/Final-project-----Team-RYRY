import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardTitle, Button, Card, CardBody, CardFooter, CardText, CardHeader} from 'reactstrap';

export default class NewsfeedContainer extends React.Component{
    constructor(args){
        super(...args);
        this.state ={

        }

    }

    render(){
        return(
            <div className="news-feed-root">
                {this.props.myFeeds.map((feed, index) => {
                    return (
                    <div className="feed-wrapper">
                        <Card width="450px">
                            <CardHeader>{feed}</CardHeader>
                            <CardBody>
                                <CardTitle>{feed}</CardTitle>
                                <CardText>{feed}</CardText>
                                <small className="text-muted">Last updated {index} minutes ago</small>
                                <CardFooter>{feed}</CardFooter>
                            </CardBody>
                        </Card>
                    </div>
                    )})}
            </div>
        )
    };
}