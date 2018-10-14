import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css'

export default class InputContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.whenChanged = this.whenChanged.bind(this);
        this.state = {
            errMessage: '',
            value: ''
        }
    }

    render() {
        var inputElement;
        var labelClassName = this.props.labelClassName + " input-label";

        if (this.props.multyLine) {
            inputElement = <textarea style={{verticalAlign: top}} className={this.props.inputClassName} name={this.props.myName} type={this.props.type}
                                  placeholder="Enter text here..." value={this.state.value}
                                  onChange={this.whenChanged}/>;
        } else {
            inputElement =
                <input className={this.props.inputClassName} name={this.props.myName} type={this.props.type}
                          placeholder="Enter text here..." value={this.state.value}
                          onChange={this.whenChanged}/>;
        }
        return (
            <div className="input-wrapper">
                <label className={labelClassName}> {this.props.labelValue}: </label>
                {inputElement}
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
