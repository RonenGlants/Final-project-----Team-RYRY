import React from 'react';
import ReactDOM from 'react-dom';
import SignUpLogoImage from '../Resources/SignUpLogo.jpg';
import InputContainer from "./InputContainer.jsx";

export default class SignUpPage extends React.Component {
    constructor(args) {
        super(...args);

    }

    render() {
        return (
            <div className="login-page-wrapper">
                <form>
                    <img className="login-logo" src={SignUpLogoImage}/>
                    <InputContainer labelClassName="username-label" labelValue="Name" type="text"
                                    inputChangeValidation={this.props.nameChangeValidation}/>
                    <br/>
                    <InputContainer labelClassName="password-label" labelValue="Password" type="password"
                                    inputChangeValidation={this.props.passwordChangeValidation}/>
                    <br/>
                    <InputContainer labelClassName="mail-label" labelValue="Email" type="email"
                                    placeholder="ronen@RYRY.com"
                                    inputChangeValidation={this.props.passwordChangeValidation}/>
                    <br/>
                    <label className="gender-label">Gender: </label>
                    <label>
                        <input type="radio" name="gender" value="male" defaultChecked/>Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female"/>Female
                    </label>
                </form>
                <input onClick={this.loginButtonClick.bind(this)} className="submit-btn btn" type="submit" value="Login"/>
            </div>
        );
    }

    loginButtonClick(){
        this.props.showLogin();
    }
}
        // todo : "on submit form"
// todo: validateMAIL