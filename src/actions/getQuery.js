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

export const getResults = (value) => (dispatch) => {
    dispatch({
        type: 'GET_NO_RESULTS',
        payload : value
    })
}