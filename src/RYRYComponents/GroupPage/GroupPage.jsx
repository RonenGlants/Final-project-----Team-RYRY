import React from 'react';
import Modal from 'react-responsive-modal';
import {Button, Card, CardBody, CardHeader, CardImg, Col, Row} from 'reactstrap';
import FriendProfileContainer from './FriendProfileContainer.jsx';

import '../../GroupPage.css';
import NewsfeedContainer from "../HomePage/NewsfeedContainer.jsx";

require('url');

export default class GroupPage extends React.Component{
    constructor(args){
        super(args);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.disassembleGroup = this.disassembleGroup.bind(this);
        this.isUserAFriend = this.isUserAFriend.bind(this);

        this.state = {
            modalOpen: false,
            userName: '',
            name: '',
            manager: '',
            friends: [],
            description: '',
            startingDate: '',
            startingTime: '',
            endingDate: '',
            endingTime: ''
        }
    }

    componentWillMount(){
        this.disassembleGroup();
        this.isUserAFriend();
    }

    render() {
        return(
            <div className="group-page-root">
                <Modal open={this.state.modalOpen} onClose={this.onCloseModal}>
                    <FriendProfileContainer/>
                </Modal>
                <div className="group">
                <Row>
                    <FriendsListContainer myFriends={this.state.friends}></FriendsListContainer>

                </Row>
                    <FriendsListContainer myFriends={this.state.friends}></FriendsListContainer>
                    <NewsfeedContainer/>
                </div>
            </div>
        )
    }


    onOpenModal(){
        this.setState({modalOpen: true})
    };

    onCloseModal(){
        this.setState({modalOpen: false})
    };

    disassembleGroup() {
        if (this.props.myType === "events"){
            this.setState({
                name: this.props.myGroup.name,
                manager: this.props.myGroup.manager,
                friends: this.props.myGroup.friends,
                description: this.props.description,
                startingDate: this.props.myGroup.startingDate,
                startingTime: this.props.myGroup.startingTime,
                endingDate: this.props.myGroup.endingDate,
                endingTime: this.props.myGroup.endingTime
            })
        }

        else {
            this.setState({
                name: this.props.myGroup.name,
                description: this.props.myGroup.description
            })
        }
    };

    isUserAFriend(){
        let isAFriend = false;
        let isAManager = this.state.manager === this.props.userName;

        this.state.friends.forEach(friend => {
            if (friend === this.props.userName){
                isAFriend = true;
            }

        });
    }
}