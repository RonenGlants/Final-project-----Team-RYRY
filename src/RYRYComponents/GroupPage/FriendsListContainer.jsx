import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
export default class FriendsListContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.onFriendClick = this.onFriendClick.bind(this);

        this.state = {
            friends: [],
        }
    }

    render() {
        let friends = [];
        if (this.props.friendsData != undefined) {
            this.props.friendsData.map(friend => {
                    let score = this.props.calcFriendScore(this.props.currUserId, friend.id);
                    let matchedFriend = {
                        fullName: friend.firstName + " " + friend.lastName,
                        score: score,
                    }
                    friends.push(matchedFriend);
                }
            )
        }

        if (friends.length > 0) {
            return (
                <div className="friend">
                    <BootstrapTable data={friends}>
                        <TableHeaderColumn dataField='fullName'>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='score'>Match points</TableHeaderColumn>
                    </BootstrapTable>

                </div>

            );
        }
        else {
            return <div></div>
        }
    };

    onFriendClick(event) {
        var value = JSON.parse(event.target.value);

        this.props.openFriendInfoModal(value.friend);
    }
}