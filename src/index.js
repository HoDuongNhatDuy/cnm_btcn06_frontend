import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter, Route} from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import logo from './logo.svg';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer'
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(reducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Provider store={store}>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
            </p>
            <HashRouter>
                <div>
                    <Route path="/" component={App}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </div>
            </HashRouter>
        </div>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
