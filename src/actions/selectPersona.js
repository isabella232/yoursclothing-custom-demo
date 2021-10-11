export const selectPersona = (value) => (dispatch) => {
    dispatch({
        type: 'SELECTPERSONA',
        payload : value
    })
}