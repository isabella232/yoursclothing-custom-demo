export const getQuery = (value) => (dispatch) => {
    dispatch({
        type: 'GET_QUERY',
        payload : value
    })
}

export const getInput = (value) => (dispatch) => {
    dispatch({
        type: 'GET_INPUT',
        payload : value
    })
}