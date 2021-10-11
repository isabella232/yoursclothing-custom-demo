const initState = {
    product : {},
    showModal: null
}

const productDetail  = (state = initState, action) => {
switch(action.type){
    case 'PRODUCT_DETAIL':
        return {
            ...state,
            product: action.payload
        }
    case 'SHOW_MODAL_PDP':
        return{
            ...state,
            showModal: action.payload

            }
        default:
      return { ...state };

    
}
}

export default productDetail