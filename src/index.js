import React from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from './RYRYComponents/BaseContainer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';


/* Directly adding react element */
ReactDOM.render(
    <BaseContainer ref={(basePage) => {window.basePage = basePage}}/>,
    document.getElementById("root")
);
