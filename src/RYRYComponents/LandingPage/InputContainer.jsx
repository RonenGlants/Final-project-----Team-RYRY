import React from 'react';
import ReactDOM from 'react-dom';

export default class InputContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state={
            errMessage:'',
        }
    }

    render() {
        return (
            <div>
                <label className={this.props.labelClassName}> {this.props.labelValue}: </label>
                <input type={this.props.type} onChange={this.whenChanged.bind(this)}/>
                  <br/>
                <label className="errMessage">{this.state.errMessage}</label>
            </div>
        );
    }

    whenChanged(event) {
        let message = this.props.inputChangeValidation(event.target.value);
        this.setState(() => ({
            errMessage: message,
        }));
    }
}

