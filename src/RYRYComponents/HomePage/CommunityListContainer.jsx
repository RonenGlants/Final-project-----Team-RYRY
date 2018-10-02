import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';

export default class CommunityListContainer extends React.Component{
    constructor(args){
        super(...args);
        this.onGroupClick = this.onGroupClick.bind(this);

        this.state ={
        }
    }

    render(){
        return(
            <div className="community">
                {this.props.myCommunities.map((community) => {
                    return <Button color="primary" className="community-each" onClick={this.onGroupClick} value={community.name}>{community.name}</Button>
                })}
            </div>
        )
    };

    onGroupClick(event){
        this.props.invokeOnGroupClick(event.target.value, this.props.myType);

    }
}