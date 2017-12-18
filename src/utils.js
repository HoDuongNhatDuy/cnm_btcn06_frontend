import Cookies from 'universal-cookie';
import Configs from './Configs';
import $ from 'jquery'
import Actions from './Actions';

const cookies = new Cookies();

const showSnackBar = function (text, type = "normal") {
    let x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
            x.className = x.className.replace("show", "");
            x.innerHTML = "";
        }
        , 5000);
};

const getTotalInfo = function (callback) {
    let user_id = cookies.get('user_id');

    let url = Configs.API_prefix + `/user/${user_id}/total-info`;
    $.get(url, function (response) {
        if (!response.status) {
            showSnackBar(response.message);
        }

        callback(response);

        // thisComponent.setState({
        //     wallets: response.data.wallets,
        //     transactions: response.data.transactions
        // });
    })
}

const getTransaction = function (walletId, callback) {
    let url = Configs.API_prefix + `/wallet/${walletId}`;
    $.get(url, function (response) {
        if (!response.status) {
            showSnackBar(response.message);
            callback([]);
            return;
        }

        callback(response.data.transactions);
        return;
    })
};

const getWallets = function (callback) {
    getTotalInfo(function (response) {
        if (response.status === 0) {
            callback([]);
            showSnackBar(response.message);
            return;
        }

        callback(response.data.wallets);
    })
};

const updateTransactions = function (dispatch, walletId) {
    if (walletId && walletId !== 'undefined') {
        getTransaction(walletId, function (response) {
            dispatch(Actions.UpdateTransactions(response));
        });
    }
    else {
        getTotalInfo(function (response) {
            if (response.status === 0) {
                dispatch(Actions.UpdateTransactions([]));
                return;
            }
            dispatch(Actions.UpdateTransactions(response.data.transactions));
        });
    }
};

const updateWallets = function (dispatch, currentWalletId = null) {
    getWallets(function (wallets) {
        dispatch(Actions.UpdateWallets(wallets));

        if (currentWalletId) {
            wallets.forEach(function (wallet) {
                if (wallet._id === currentWalletId) {
                    dispatch(Actions.UpdateCurrentWallet(wallet));

                }
            })
        }
    })
};

const updateCurrentWallets = function (dispatch, currentWallet) {
    dispatch(Actions.UpdateCurrentWallet(currentWallet));
};

export default {
    showSnackBar,
    getTotalInfo,
    getTransaction,
    getWallets,
    updateTransactions,
    updateWallets,
    updateCurrentWallets
}