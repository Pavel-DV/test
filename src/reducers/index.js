import { combineReducers } from 'redux'
import myStr from './myStr'
import myAddresses from './myAddresses'

const smartContractApp = combineReducers({
    myStr,
    myAddresses
});

export default smartContractApp