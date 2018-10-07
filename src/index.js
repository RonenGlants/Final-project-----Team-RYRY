import React from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from './RYRYComponents/BaseContainer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';


/* Directly adding react element */
ReactDOM.render(
    <BrowserRouter>
        <BaseContainer history={history} ref={(basePage) => {window.basePage = basePage}}/>
    </BrowserRouter>
    , document.getElementById("root")
);

//todo: BrowserRouter creates an instance of 'History' for out entire application.
//todo: history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.