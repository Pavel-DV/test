
export const addAddressAct = (address) => {
    return {
        type: 'ADD_ADDRESS',
        address
    }
};

export const setActiveAddressAct = (address) => {
    return {
        type: 'SET_ACTIVE_ADDRESS',
        address
    }
};

export const writeStrAct = (str) => {
    return {
        type: 'WRITE_STR',
        str
    }
};