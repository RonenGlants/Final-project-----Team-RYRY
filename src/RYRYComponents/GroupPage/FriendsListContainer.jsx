import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FriendsListContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.onFriendClick = this.onFriendClick.bind(this);

        this.state = {
            friendsData: [],
        }
    }

    componentWillMount() {
        this.getFriendsData(this.props.myFriends);
    }

    render() {
        return (
            <div className="friend">
                {this.state.friendsData.map(friend => {
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

    getFriendsData(friendsIds) {
        fetch('users/friends?friendsIds=' + friendsIds, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(content => {
                this.setState({
                    friendsData: content.friends,
                });
            })
            .catch(err => {
                throw err
            });
    }
}