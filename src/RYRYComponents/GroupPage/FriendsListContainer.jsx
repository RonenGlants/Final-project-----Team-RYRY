import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';

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
                    var fullName = friends.firstName + " " + friends.lastName;

                    return <Button color="success" className="" onClick={this.onFriendClick}
                                   value={fullName}>{friend}</Button>
                })}
            </div>
        );
    };

    onFriendClick(event) {

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
                    friendsData: content,
                });
            })
            .catch(err => {
                throw err
            });
    }
}