import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle} from 'reactstrap';
import '../../GroupPage.css';

export default class FriendProfileContainer extends React.Component{
    constructor(args){
        super(args);
        this.onMessageClick = this.onMessageClick.bind(this);

        this.state = {

        }
    }

    render(){
        return(
            <div className="friend-profile-root">
                <Card>
                    <CardHeader>
                        <CardTitle>{this.props.firstName} {this.props.lastName}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            I can teach you {this.props.firstSkill}, {this.props.secondSkill}, {this.props.thirdSkill}
                        </CardText>
                        <CardText>
                            I'd like to learn {this.props.firstDesire}, {this.props.secondDesire}, {this.props.thirdDesire}
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary"> Message {this.props.firstName} onClick={this.onMessageClick}</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    onMessageClick(){

    }
}

