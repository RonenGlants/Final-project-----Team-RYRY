import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';

export default class FriendsListContainer extends React.Component{
    constructor(args){
        super(...args);
        this.onFriendClick = this.onFriendClick.bind(this);

        this.state ={
        }
    }

    render(){
        return(
            <div className="friend">
                {this.props.myFriends.map((friend) => {
                    return <Button color="success" className="" onClick={this.onFriendClick} value={friend}>{friend}</Button>
                })}
            </div>
        )
    };

    onFriendClick(event){

    }
}