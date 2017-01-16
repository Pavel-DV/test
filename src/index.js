import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import smartContractApp from './reducers'

import SmartContractsApp from './components/App'
import Web3 from 'web3'
import test from 'contracts/test.sol';

import './index.css'

import truffleConfig from '../truffle.js'
import { addAddressAct, setActiveAddressAct } from './actions'
import { readStr } from 'TruffleFunctions';

var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;

window.addEventListener('load', function() {
    var web3Provided;
    web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
    web3Provided.eth.getAccounts(function (err, accs) {
        if (err != null) {
            alert('There was an error fetching your accounts.');
            console.error(err);
            return
        }

        if (accs.length === 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return
        }

        let store = createStore(smartContractApp);

        store.dispatch(addAddressAct(test.address));
        store.dispatch(setActiveAddressAct(test.address));
        test.setProvider(web3Provided.currentProvider);
        readStr(test.address, store.dispatch);

        const myRender = () => {
            render(
                <Provider store={store}>
                    <MuiThemeProvider>
                        <SmartContractsApp account={accs[0]} />
                    </MuiThemeProvider>
                </Provider>,
                document.getElementById('root')
            );
        };

        store.subscribe(myRender);

        myRender();

    });

});

