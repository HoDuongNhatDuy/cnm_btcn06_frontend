import React from "react";
import './TransactionList.css';
import CreateTransactionModal from "./CreateTransactionModal";
import Utils from '../utils';
import {connect} from 'react-redux'

class TransactionList extends React.Component {
    constructor(props) {
        super(props);

        let walletId   = this.props.match.params.id;
        let {dispatch} = this.props;
        Utils.updateTransactions(dispatch, walletId);

        Utils.updateWallets(this.props.dispatch, walletId);
    }

    render() {
        let transactions = this.props.transactions.map((transaction, index) => {
            let is_sent = false;
            if (!this.props.currentWallet) {
                is_sent = false;
            }
            else {
                is_sent = transaction.source_wallet._id === this.props.currentWallet._id;
            }
            return (
                <blockquote key={"transaction-" + index} className={is_sent ? 'sent' : 'received'}>
                    <div className="row">
                        <div className="col-sm-2 square pull-left">
                            <span className={"glyphicon glyphicon-arrow-" + (is_sent ? 'up' : 'down')}></span>
                        </div>
                        <div className="col-sm-9">
                            <p>{transaction.source_user.username + " - " + (is_sent ? transaction.dest_wallet.name : transaction.source_wallet.name)}</p>
                            <p>{transaction.description}</p>
                        </div>
                        <div className="col-sm-1 amount">{transaction.amount}</div>
                    </div>
                    <cite>{transaction.created_at.substr(0, 19).replace("T", " ")}</cite>
                </blockquote>
            );
        });

        let createModal = null;
        if (this.props.match.params.id) {
            createModal =
                <CreateTransactionModal onSubmit={(description, amount, dest_wallet_id) => this.props.onCreateTransaction(description, amount, dest_wallet_id)}/>;
        }

        let title = <h1>Dashboard</h1>;
        if (this.props.currentWallet && this.props.currentWallet.name) {
            title = (
                <div>
                    <h1>{this.props.currentWallet.name} </h1>
                    <p> Wallet ID: {this.props.match.params.id} </p>
                </div>
            );
        }

        return (
            <div>
                <div className="text-center">
                    {title}
                </div>
                <div className="create-transaction">
                    {createModal}
                </div>
                {transactions}
            </div>
        );
    }
}

TransactionList = connect(function (state) {
    return {...state}
})(TransactionList);

export default TransactionList;