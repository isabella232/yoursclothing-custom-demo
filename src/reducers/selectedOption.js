const initState = {
    persona : null
}

const selectedPersona  = (state = initState, action) => {
switch(action.type){
    case 'SELECTPERSONA':
        return {
            ...state,
            persona: action.payload
        }
        default:
      return { ...state };

    
}
}

export default selectedPersona