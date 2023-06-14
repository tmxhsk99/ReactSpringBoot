export function postReducer(state, action){
    switch (action.type) {
        case "INIT": {
            state = action.data;
            return action.data;
        }
        case "PAGE_MOVE":{
            state = action.data;
            return action.data;
        }

    }
}