let default_state = {
    transactions: [],
    wallets: [],
    currentWallet: null
};

export default (state = default_state, action) => {
    switch (action.type) {
        case 'UPDATE_TRANSACTIONS':
            let transactions = action.action.transactions;
            return {...state, transactions};
        case 'UPDATE_WALLETS':
            let wallets = action.action.wallets;
            return {...state, wallets};
        case 'UPDATE_CURRENT_WALLET':
            let currentWallet = action.action.currentWallet;
            return {...state, currentWallet};
        default:
            return state
    }
}
