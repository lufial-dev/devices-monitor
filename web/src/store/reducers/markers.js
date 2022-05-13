const INITIAL_STATE = []

export default function user(state = INITIAL_STATE, action){
    if(action.type === "SET_MARKERS"){
        return action.markers;
    }

    return state;
}