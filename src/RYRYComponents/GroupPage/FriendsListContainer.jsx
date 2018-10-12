import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FriendsListContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.onFriendClick = this.onFriendClick.bind(this);

        this.state = {
        }
    }

    render() {
        return (
            <div className="friend">
                {this.props.friendsData.map(friend => {
                    var fullName = friend.firstName + " " + friend.lastName;

                    return <button color="success" className="" onClick={this.onFriendClick}
                                   value={JSON.stringify({friend})}>{fullName}</button>
                })}
            </div>
        );
    };

    onFriendClick(event) {
        var value = JSON.parse(event.target.value);

        this.props.openFriendInfoModal(value.friend);
    }
}