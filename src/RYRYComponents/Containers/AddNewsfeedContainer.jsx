import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AddNewsfeedContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.addFeed = this.addFeed.bind(this);

        this.state = {
            value: ""
        }
    }

    render() {
        return (
            <div>
                <label className="feed-input-label">"Add feed:"</label>
                <input className="feed-input" name="new feed" type="text" onChange={this.onChange}
                       placeholder="enter text here..."/>
                <button onClick={this.onAdd}>submit</button>
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
                feed: this.state.value,
                groupName: this.props.groupName,
                userId: this.props.currentUserId,
            }),
            credentials: 'include'
        }).then(response => {        // response is the result
            if (response.ok) {      // ok == 200
                console.log("request added")
            } else {
                console.log("addRequest failed: response not ok")
            }
        });
    }

    onChange(event) {
        this.state.value = event.target.value;
    }
}