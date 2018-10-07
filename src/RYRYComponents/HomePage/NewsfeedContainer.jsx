import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle} from 'reactstrap';

export default class NewsfeedContainer extends React.Component {
    constructor(args) {
        super(...args);

        this.state = {
            myFeeds: [],
        }
    }

    tick() {
        this.setState(prevState => ({
            myFeeds: this.getMyFeeds()
        }));
    }

    componentDidMount() {
        this.interval //= setInterval(() => this.tick(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="news-feed-root">
                {this.state.myFeeds.map((feed, index) => {
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
                    )
                })}
            </div>
        )
    };

    getMyFeeds(){
        return this.state.myFeeds.push("test");
    }
}