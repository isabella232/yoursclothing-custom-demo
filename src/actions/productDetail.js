export const productDetail = (value) => (dispatch) => {
    dispatch({
        type: 'PRODUCT_DETAIL',
        payload : value
    })
}

export const showModalPDP = (value) => (dispatch) => {
    dispatch({
        type: 'SHOW_MODAL_PDP',
        payload: value
    })
}