import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardText} from 'reactstrap';

export default class CommunityListContainer extends React.Component{
    constructor(args){
        super(...args);
        this.state ={
        }
    }

    render(){
        return(
            <div className="community">
                {this.props.myCommunities.map((community) => {
                    return <CardText className="community-each">{community.name}</CardText>
                })}
            </div>
        )
    };
}