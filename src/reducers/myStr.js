const myStr = (state = {str: undefined}, action) => {
    switch (action.type) {
        case 'WRITE_STR':
            if(state.str !== action.str) {
                return {...state, str: action.str};
            }
            return state;
        default:
            return state;
    }
};

export default myStr