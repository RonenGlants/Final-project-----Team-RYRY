import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InputContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.whenChanged = this.whenChanged.bind(this);
        this.state = {
            errMessage: '',
            value:''
        }
    }

    render() {
        return (
            <div>
                <label className={this.props.labelClassName}> {this.props.labelValue}: </label>
                <input className={this.props.inputClassName} name={this.props.myName} type={this.props.type} placeholder="enter text here..." value={this.state.value} onChange={this.whenChanged}/>
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
        this.setState({value: event.target.value});
        this.props.handleMyChange(event.target.name, event.target.value);
    }
}
