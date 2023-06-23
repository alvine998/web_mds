const initialState = {
    data: null
}

const dataReducer = (state:any = initialState, action: any) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default dataReducer;