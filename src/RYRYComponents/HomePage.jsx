import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Card, CardBody, CardImg, CardText, CardHeader, Row, Col} from 'reactstrap';
import HomePageLogo from './Resources/HomePageLogo.jpg'
import UserProfileLogo from './Resources/UserProfileLogo.jpg'
import CommunityListContainer from "./CommunityListContainer.jsx";

export default class HomePage extends React.Component{
    constructor(args){
        super(...args);


        this.state ={

        }
    }

    render(){
        return(
           <div>
            <Row>
                <Col sm={{ size: 1}} md={{ size: 2}}>
                    <Card>
                        <CardHeader>
                            <Button onClick={this.userProfileClick.bind(this)}><CardImg top width="100%" src={UserProfileLogo}/></Button>
                            Hello, user
                        </CardHeader>
                        <CardBody>
                            <CardText/>How are you today?
                        </CardBody>
                    </Card>
                </Col>
                <Col sm={{ size: 3}} md={{ size: 1}}>
                      <img className="home-page-logo" src={HomePageLogo} width={800} height={200}/>
                </Col>
                <Col sm={{ size: 1}} md={{ size: 2, offset: 7}}>
                    <div>
                        <CommunityListContainer/>
                    </div>
                </Col>
            </Row>

            <Row>
            </Row>
           </div>
        );
    }

    userProfileClick(){
        this.props.showUserProfile();
    };
}