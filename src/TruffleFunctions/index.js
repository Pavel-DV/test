import test from 'contracts/test.sol';
import { addAddressAct, setActiveAddressAct, writeStrAct } from '../actions'

export function readStr(activeAddress, dispatch) {
    try{
        var contract = test.at(activeAddress);
    } catch (e){
        console.log(e);
        setStatus("Error getting string; " + e.message);
        dispatch(writeStrAct(''));
        return;
    }

    setStatus("Reading string... (please wait)");

    contract.read().then(function(value) {
        dispatch(writeStrAct(value.valueOf()));
        setStatus("Reading complete!");
    }).catch(function(e) {
        console.log(e);
        setStatus("Error getting string; see log.");
    });
}

export function writeStr(myStr, activeAddress, account) {

    try{
        var contract = test.at(activeAddress);
    } catch (e){
        console.log(e);
        setStatus("Error sending string; " + e.message);
        return;
    }

    setStatus("Initiating transaction... (please wait)");

    contract.write(myStr, {from: account}).then(function() {
        setStatus("Writing complete!");
    }).catch(function(e) {
        console.log(e);
        setStatus("Error sending string; see log.");
    });
}

export function newContract(dispatch, account) {
    test.new({from: account, gas:1000000}).then(
        function(contract) {
            dispatch(addAddressAct(contract.address));
            dispatch(setActiveAddressAct(contract.address));
        }
    )
}

function setStatus(message) {
    var status = document.getElementById("status");
    if (status){
        status.innerHTML = message;
    }
}