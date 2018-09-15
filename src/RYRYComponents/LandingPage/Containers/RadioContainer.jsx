import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RadioContainer extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        var rows = [];
        var isDefaultChecked = true;

        this.props.choiceOptions.map(option => {
            if (isDefaultChecked) {
                rows.push(
                    <label>
                        <input type="radio" name={this.props.choiceTitle} value={option} defaultChecked/>{option}
                    </label>);

                isDefaultChecked =false;
            }
            else {
                rows.push(
                    <label>
                        <input type="radio" name={this.props.choiceTitle} value={option}/>{option}
                    </label>);
            }

        });

        return <div>
            <label className={this.props.choiceTitle}>{this.props.choiceTitle}: </label>
            {rows}
        </div>;
    }
}
