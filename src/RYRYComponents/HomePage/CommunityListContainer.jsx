import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';

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
                            <Button className="submit-btn btn" color="primary" value={community.name} type="submit" onClick={this.handleGroupClick}>
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