import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';

import VisibleAddressesList from '../containers/VisibleAddressesList'
import { readStr, writeStr, newContract } from 'TruffleFunctions';
import { addAddressAct, setActiveAddressAct, writeStrAct } from '../actions'

import './App.css'

injectTapEventPlugin();

const textFieldStyle = {
    marginLeft: 20,
    width: 400
};

let SmartContractsApp = ({ myStr,  myAddresses, account, dispatch }) => {

    let strInput, addressInput;

    let write = () => {
        var newStr = strInput.getValue();
        var oldStr = myStr.str;

        dispatch(writeStrAct(newStr));

        if(oldStr !== newStr) {
            writeStr(newStr, myAddresses.activeAddress, account);
        }
    };

    let publish= () => {
        var newAddr = addressInput.getValue();
        if(!newAddr){
            newContract(dispatch, account);
            dispatch(writeStrAct(''));
        } else {
            dispatch(addAddressAct(newAddr));
            dispatch(setActiveAddressAct(newAddr));
            readStr(newAddr, dispatch);
        }
    };

    return (
        <div>
            <Paper zDepth={2} style={{padding: 20}}>
                <RaisedButton onClick={() => {
                    readStr(myAddresses.activeAddress, dispatch);
                }} label="Read" />
                <h2 style={textFieldStyle}>{myStr.str}</h2>
                <br />

                <RaisedButton onClick={write} label="Write" />
                <TextField
                    style={textFieldStyle}
                    hintText="test text"
                    floatingLabelText="Enter String Here"
                    ref={node => {
                        strInput = node;
                    }}
                />
               <br />

            </Paper>

            <RaisedButton onClick={publish} label="publish contract" />
            <TextField
                style={textFieldStyle}
                hintText="0xeb3d093497081f84de09cd8af8854a69b502a4a2"
                floatingLabelText="Enter Address Here"
                ref={node => {
                    addressInput = node;
                }}
            />
            <VisibleAddressesList />

            <br /><br />

            <div id="status"></div>
        </div>
    )

};

SmartContractsApp.propTypes  = {
    myStr: PropTypes.shape({
        str: PropTypes.string
    }),
    myAddresses: PropTypes.shape({
        activeAddress: PropTypes.string,
        addresses: PropTypes.object.isRequired
    }),
    account: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        myStr: state.myStr,
        myAddresses: state.myAddresses
    }
};

SmartContractsApp = connect(mapStateToProps)(SmartContractsApp);

export default SmartContractsApp