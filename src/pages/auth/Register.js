import React from "react";
import {HashRouter, NavLink} from "react-router-dom";
import Util from '../../utils';
import Configs from '../../Configs';
import $ from 'jquery'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Register extends React.Component {
    validate() {
        if (this.refs.username.value === '') {
            Util.showSnackBar("Invalid username");
            return false;
        }

        if (this.refs.email.value === '') {
            Util.showSnackBar("Invalid email");
            return false;
        }

        if (this.refs.password.value === '') {
            Util.showSnackBar("Invalid password");
            return false;
        }

        return true;
    }

    submit() {
        if (!this.validate())
            return;

        let url = Configs.API_prefix + "/register";
        let data = {
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value
        };

        let thisComponent = this;
        $.post(url, data, function (response) {
            console.log(response);
            if (response.status === 1) {
                cookies.set('user_id', response.data.user_id, {path: '/'});
                thisComponent.props.history.push('/');
            }
            else {
                Util.showSnackBar(response.message);
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Register</h2>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2" htmlFor="username">Username:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" ref="username" id="username" placeholder="Enter username"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2" htmlFor="email">Email:</label>
                        <div className="col-sm-4">
                            <input type="email" className="form-control" ref="email" id="email" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2" htmlFor="pwd">Password:</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" ref="password" id="pwd" placeholder="Enter password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <HashRouter>
                            <div>
                                <NavLink to="/login">Login</NavLink>
                            </div>
                        </HashRouter>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-4 col-sm-4">
                            <button type="button" className="btn btn-default" onClick={() => this.submit()}>Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}