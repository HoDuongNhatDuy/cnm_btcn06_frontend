import React from "react";
import {Modal, Button} from 'react-bootstrap'
import './CreateModal.css';
import {connect} from 'react-redux'
import Configs from '../Configs';
import Utils from '../utils';
import $ from 'jquery'

class CreateTransactionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    validateCreateTransaction(description, amount, dest_wallet_id) {
        if (description === '') {
            Utils.showSnackBar("Invalid transaction description");
            return false;
        }

        if (amount === '' || amount < 0) {
            Utils.showSnackBar("Invalid amount");
            return false;
        }

        if (dest_wallet_id === '') {
            Utils.showSnackBar("Invalid destination ID");
            return false;
        }

        return true;
    }

    submit() {
        let description    = this.refs.description.value;
        let dest_wallet_id = this.refs.dest_wallet_id.value;
        let amount         = this.refs.amount.value;

        if (!this.validateCreateTransaction(description, amount, dest_wallet_id))
            return;

        Utils.showSnackBar("Creating transaction");
        let url             = Configs.API_prefix + `/transaction`;
        let currentWalletId = this.props.currentWallet._id;
        let data            = {
            "source_wallet": currentWalletId,
            "dest_wallet": dest_wallet_id,
            "amount": amount,
            "description": description,
        };

        let thisComponent = this;
        $.post(url, data, function (response) {
            if (response.status === 1) {
                Utils.updateTransactions(thisComponent.props.dispatch, currentWalletId);
                Utils.updateWallets(thisComponent.props.dispatch);
            }
            else {
            }
            Utils.showSnackBar(response.message);
        });


        this.close();
    }

    render() {
        return (
            <div>
                <button title="Add new transaction" className="create-wallet-btn btn-success btn" onClick={() => this.open()}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>

                <Modal show={this.state.showModal} onHide={() => this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="description">Description</label>
                                    <div className="col-sm-3">
                                        <textarea className="form-control" ref="description" id="description" placeholder="Transaction description"></textarea>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="amount">Amount</label>
                                    <div className="col-sm-3">
                                        <input type="number" className="form-control" ref="amount" id="amount" placeholder="Amount"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="dest_wallet_id">Destination
                                        wallet ID</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" ref="dest_wallet_id" id="dest_wallet_id" placeholder="Destination wallet ID"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.submit()}>Submit</button>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

CreateTransactionModal = connect(function (state) {
    return {...state}
})(CreateTransactionModal);

export default CreateTransactionModal;