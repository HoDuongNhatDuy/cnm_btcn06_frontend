const UpdateTransactions = (transactions) => ({
    type: 'UPDATE_TRANSACTIONS',
    action: {transactions}
});

const UpdateWallets = (wallets) => ({
    type: 'UPDATE_WALLETS',
    action: {wallets}
});

const UpdateCurrentWallet = (currentWallet) => ({
    type: 'UPDATE_CURRENT_WALLET',
    action: {currentWallet}
});



export default {UpdateTransactions, UpdateWallets, UpdateCurrentWallet}