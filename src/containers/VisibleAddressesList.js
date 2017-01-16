import { connect } from 'react-redux'
import { setActiveAddressAct } from '../actions'
import AddressesList from '../components/AddressesList'
import { readStr } from 'TruffleFunctions';

const mapStateToProps = (state) => {
    return {
        addresses: state.myAddresses.addresses,
        activeAddress: state.myAddresses.activeAddress
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveAddressFunc: (address) => {
            dispatch(setActiveAddressAct(address));
            readStr(address, dispatch);
        }
    }
};

const VisibleAddressesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressesList);

export default VisibleAddressesList