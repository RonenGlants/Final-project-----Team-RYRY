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
                    return (
                        <div className="feed-wrapper">
                            <Card width="100px">
                                <CardBody>
                                    <CardText className="feed-user-name">Name: {feed.userId}</CardText>
                                    <CardText className="feed-group-name">Group: {feed.groupName}</CardText>
                                    <CardText className="feed-text">Message: {feed.feed}</CardText>
                                    <small className="text-muted">Post time {feed.postTime}</small>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    };
}