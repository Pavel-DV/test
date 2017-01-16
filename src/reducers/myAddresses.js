const myAddresses = (state = {addresses: {}, activeAddress: undefined}, action) => {
    switch (action.type) {
        case 'ADD_ADDRESS':
            if (!state.addresses[action.address]) {
                return {
                    ...state,
                    addresses: {
                        ...state.addresses,
                        [action.address]: action.address
                    }
                };
            }
            return state;
        case 'SET_ACTIVE_ADDRESS':
            if (state.addresses[action.address] && state.activeAddress !== action.address) {
                return {
                    ...state,
                    activeAddress: action.address
                };
            }
            return state;
        default:
            return state;
    }
};

export default myAddresses