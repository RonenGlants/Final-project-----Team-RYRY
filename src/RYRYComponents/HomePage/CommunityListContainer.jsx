import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardText, Button} from 'reactstrap';

export default class CommunityListContainer extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
        }
    }

    render(){
        return(
            <div className="community">
                {this.props.myCommunities.map((community) => {
                    return <div>
                            <Button color="primary" value={community.name} onClick={this.handleGroupClick}>
                            {community.name}
                            </Button>
                            <br/>
                            </div>
                })}
            </div>
        )
    }

    handleGroupClick(event){
        this.props.onGroupClick(event.target.value, this.props.myType); // value should hold the group name
    }

}