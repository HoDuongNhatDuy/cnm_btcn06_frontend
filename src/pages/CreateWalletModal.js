import React from "react";
import {Modal, Button} from 'react-bootstrap'
import './CreateModal.css';
import {connect} from 'react-redux'
import Configs from '../Configs';
import Utils from '../utils';
import $ from 'jquery'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CreateWalletModal extends React.Component {
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

    validateCreateWallet(name, description) {
        if (name === '') {
            Utils.showSnackBar("Invalid wallet name");
            return false;
        }

        if (description === '') {
            Utils.showSnackBar("Invalid wallet description");
            return false;
        }

        return true;
    }

    submit() {
        let name        = this.refs.name.value;
        let description = this.refs.description.value;
        let user_id     = cookies.get('user_id');

        if (!this.validateCreateWallet(name, description))
            return;

        Utils.showSnackBar("Creating wallet");
        let url  = Configs.API_prefix + `/wallet`;
        let data = {
            "user": user_id,
            "name": name,
            "description": description
        };

        let thisComponent = this;
        $.post(url, data, function (response) {
            if (response.status === 1) {
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
                <button title="Add new wallet" className="create-wallet-btn btn-success btn" onClick={() => this.open()}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>

                <Modal show={this.state.showModal} onHide={() => this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Wallet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group row">
                                    <label className="control-label col-sm-1" htmlFor="name">Name</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" ref="name" id="name" placeholder="Wallet name"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-1" htmlFor="description">Description</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" ref="description" id="description" placeholder="Wallet description"/>
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

CreateWalletModal = connect(function (state) {
    return {}
})(CreateWalletModal);

export default CreateWalletModal;