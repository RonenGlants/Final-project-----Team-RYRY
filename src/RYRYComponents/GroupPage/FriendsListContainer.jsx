import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GroupPage.css';

var ReactBsTable = require('react-bootstrap-table');
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
        this.props.friendsData.map(friend => {
                let score = this.props.calcFriendScore(this.props.currUserId, friend.id);
                let matchedFriend = {
                    email:friend.id,
                    fullName: friend.firstName + " " + friend.lastName,
                    score: score,
                }
                friends.push(matchedFriend);
            });

        if (friends.length > 0) {
            var scope = this;
            var options={ onRowClick:function (row) {
                    scope.onFriendClick(row.email);
                }}
            return (
                <div className="friends-wrapper">
                    <BootstrapTable className="friends-table" data={friends} options={options}>
                        <TableHeaderColumn isKey dataField='email' hidden="true">Email</TableHeaderColumn>
                        <TableHeaderColumn className="friend-Row" dataField='fullName'>Name</TableHeaderColumn>
                        <TableHeaderColumn className="friend-Row" dataField='score' sort>Match points</TableHeaderColumn>
                    </BootstrapTable>

                </div>

            );
        }
        else {
            return <div></div>
        }
    };

    onFriendClick(friendId) {
        this.props.openFriendInfoModal((this.props.friendsData.filter(friend=>{return friend.id === friendId}))[0]);
    }
}