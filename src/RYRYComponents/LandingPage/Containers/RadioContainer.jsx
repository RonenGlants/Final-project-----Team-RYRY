import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RadioContainer extends React.Component {
    constructor(args) {
        super(...args);

        this.whenChanged = this.whenChanged.bind(this);
        this.state ={
            type: "Male"
        }
    }

    render() {
        var rows = [];
        var isDefaultChecked = true;

        this.props.choiceOptions.map(option => {
            if (isDefaultChecked) {
                rows.push(
                    <label>
                        <input type="radio" name={this.props.choiceTitle} value={option} onChange={this.whenChanged} defaultChecked/>{option}
                    </label>);

                isDefaultChecked =false;
            }
            else {
                rows.push(
                    <label>
                        <input type="radio" name={this.props.choiceTitle} value={option} onChange={this.whenChanged}/>{option}
                    </label>);
            }

        });

        return <div>
            <label className={this.props.choiceTitle}>{this.props.choiceTitle}: </label>
            {rows}
        </div>;
    }

    whenChanged(event){
        let theType = "";
        if (event.target.checked == true){
            this.setState({type: event.target.value});
            theType = event.target.value;
        }
        else{
            if(event.target.value == "Male") {
                theType = "Female";
            }
            else{
                theType = "Male";
            }
            this.setState({type: theType});
        }
        this.props.handleMyChange(this.props.myName, theType);
    }
}
