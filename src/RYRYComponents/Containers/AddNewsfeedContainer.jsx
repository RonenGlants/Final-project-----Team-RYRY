import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardHeader} from 'reactstrap';

export default class AddNewsfeedContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.addFeed = this.addFeed.bind(this);

        this.state = {
            value: "",
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>News Feed</CardHeader>
                    <CardBody>
                <label className="feed-input-label">Write something to your group</label>
                <br/>
                <input className="feed-input" name="new feed" type="text" onChange={this.onChange}
                       placeholder="Enter text here..." value={this.state.value}/>
                <button onClick={this.onAdd}>Post</button>
                    </CardBody>
                </Card>
            </div>
        )
    };

    onAdd(event) {
        this.addFeed();
        this.setState();
    }

    addFeed() {
        return fetch('/feeds/addFeed', {
            method: 'POST',
            body: JSON.stringify({
                postTime: new Date(),
                feed: this.state.value,
                groupName: this.props.groupName,
                userId: this.props.currentUserId,
                userFirstName: this.props.firstName,
                userLastName: this.props.lastName
            }),
            credentials: 'include'
        }).then(response => {        // response is the result
            if (response.ok) {      // ok == 200
                console.log("request added")
                this.setState({value: ""});
            } else {
                console.log("addRequest failed: response not ok")
            }
        });
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }
}