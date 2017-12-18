import React from "react";
// import {Redirect, NavLink} from 'react-router-dom'
import {Redirect, Route} from "react-router-dom";

import Cookies from 'universal-cookie';
import WalletList from './WalletList';
import TransactionList from './TransactionList';
import Util from '../utils';
import './App.css';
import {connect} from 'react-redux'

const cookies = new Cookies();

class MyWallet extends React.Component {
    constructor(props) {
        super(props);

        this.checkUser();

        let user_id = cookies.get('user_id');
        this.state  = {
            user_id: user_id,
            current_wallet: null,
            wallets: [],
            transactions: []
        };
    }

    checkUser() {
        let user_id = cookies.get('user_id');
        if (!user_id || user_id === null) {
            Util.showSnackBar("Please login");
            this.props.history.push('/login');
        }
    }

    logOut() {
        cookies.remove('user_id');
        this.props.history.push('/login');
    }

    render() {
        let user_id = cookies.get('user_id');

        if (!user_id)
            return (
                <Redirect to="/login" push/>
            );

        return (
            <div className="container-fluid text-center">
                <button onClick={() => this.logOut()} className="logout-btn btn btn-danger">Logout</button>
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <WalletList />
                    </div>
                    <div className="col-sm-8 text-left">
                        <Route exact path="/wallet/:id" component={TransactionList}></Route>
                        <Route exact path="/" component={TransactionList}></Route>
                    </div>
                    <div className="col-sm-2 sidenav">
                        <div className="sidebar-nav-fixed pull-right affix">
                            <div className="well ads">
                                <p>ADS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MyWallet = connect(function (state) {
    return {...state}
})(MyWallet);

export default MyWallet;