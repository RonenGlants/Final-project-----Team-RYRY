import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle} from 'reactstrap';

export default class NewsfeedContainer extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {}
    }

    render() {
        return (
            <div className="news-feed-root">
                {this.props.myFeeds.map((feed, index) => {
                    var groupName = null;
                    if(this.props.showGroupName){
                        groupName = <CardText className="feed-group-name">Group: {feed.groupName}</CardText>
                    }
                    var year = feed.postTime.split("T")[0];
                    var time = feed.postTime.split("T")[1];
                    var hr = time.split(":")[0];
                    var min = time.split(":")[1];

                    return (
                        <div className="feed-wrapper">
                            <Card>
                                <CardBody className="feed-card">
                                    {groupName}
                                    <CardText className="feed-user-name">Name: {feed.userFirstName} {feed.userLastName}</CardText>
                                    <CardText className="feed-text">Message: {feed.feed}</CardText>
                                    <small className="text-muted">Post time {hr}:{min}   {year}</small>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    };
}