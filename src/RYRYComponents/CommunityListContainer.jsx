import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'reactstrap';

export default class CommunityListContainer extends React.Component{
    constructor(args){
        super(...args);
        this.state ={

        }

    }

    render(){
        return(
            <Table dark>
                <thead>
                    <tr>
                        <th>Communities</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>FirstCommunity</td>
                    </tr>
                    <tr>
                        <td>SecondCommunity</td>
                    </tr>
                    <tr>
                        <td>ThirdCommunity</td>
                    </tr>
                </tbody>
            </Table>
        )
    };
}