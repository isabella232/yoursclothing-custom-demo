export const searchVisible = (value) => (dispatch) => {
    dispatch({
        type: 'SEARCHVISIBLE',
        payload: value
    })
}
export const federatedSearchVisible = (value) => (dispatch) => {
    dispatch({
        type: 'FEDERATEDSEARCH_VISIBLE',
        payload: value
    })
}
export const catOne = (value) => (dispatch) => {
    dispatch({
        type: 'CAT_ONE',
        payload: value
        
    })
}
export const catTwo = (value) => (dispatch) => {
    dispatch({
        type: 'CAT_TWO',
        payload: value
    })
}
export const homepage = (value) => (dispatch) => {
    dispatch({
        type: 'HOMEPAGE',
        payload: value
    })
}