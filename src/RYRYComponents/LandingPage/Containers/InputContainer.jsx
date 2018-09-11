import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InputContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.whenChanged = this.whenChanged.bind(this);
        this.state = {
            errMessage: '',
        }
    }

    render() {
        return (
            <div>
                <label className={this.props.labelClassName}> {this.props.labelValue}: </label>
                <input type={this.props.type} onChange={this.whenChanged}/>
                <label className="errMessage">{this.state.errMessage}</label>
            </div>
        );
    }

    whenChanged(event) {
        if (typeof this.props.inputChangeValidation != 'undefined') {
            let message = this.props.inputChangeValidation(event.target.value);
            this.setState(() => ({
                errMessage: message,
            }));
        }
    }
}
