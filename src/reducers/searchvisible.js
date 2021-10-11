
const initState = {
    searchVisible: null,
    federatedSearchVisible: false,
    catOne : false,
    catTwo: false,
    homepage: true
}

 const visibility  = (state = initState, action) => {
switch(action.type){
    case 'SEARCHVISIBLE':
        return {
            ...state,
            searchVisible: action.payload
        };
    case 'FEDERATEDSEARCH_VISIBLE':
            return {
                ...state,
                federatedSearchVisible: action.payload
            };
    case 'CAT_ONE':
            return {
                ...state,
                catOne: action.payload
            };
    case 'CAT_TWO':
            return {
                ...state,
                catTwo: action.payload
            };
            case 'HOMEPAGE':
                return {
                    ...state,
                    homepage: action.payload
                };
        default:
      return { ...state };

    
}
}

export default visibility