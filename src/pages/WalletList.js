import React from "react";
import {NavLink} from 'react-router-dom'
import './WalletList.css';
import CreateWalletModal from './CreateWalletModal';
import {connect} from 'react-redux'
import Utils from '../utils';

class WalletList extends React.Component {
    constructor(props) {
        super(props);

        Utils.updateWallets(this.props.dispatch);
    }

    onChangeWallet(wallet) {
        let walletId = wallet ? wallet._id : null;
        Utils.updateTransactions(this.props.dispatch, walletId);
        Utils.updateCurrentWallets(this.props.dispatch, wallet);
    }

    render() {
        let this_component = this;
        let wallets        = this.props.wallets.map((wallet, index) => {
            return (
                <div onClick={() => this_component.onChangeWallet(wallet)} key={"wallet-" + index}>
                    <NavLink className="btn btn-success wallet-item" activeClassName='active' to={`/wallet/${wallet._id}`}>
                        <div className="row">
                            <div className="col-sm-6">
                                {wallet.name}
                            </div>
                            <div className="col-sm-6">
                                {wallet.amount}
                            </div>
                        </div>
                    </NavLink>
                </div>
            );
        });
        return (
            <div>
                <CreateWalletModal />

                <p>
                    <NavLink className="btn btn-info wallet-item dashboard" onClick={() => this_component.onChangeWallet(null)} activeClassName='active' to="/">Dashboard</NavLink>
                </p>
                {wallets}
            </div>
        );
    }
}


WalletList = connect(function (state) {
    return {...state}
})(WalletList);

export default WalletList;