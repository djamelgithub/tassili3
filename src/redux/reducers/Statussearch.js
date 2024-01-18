import { GLOBALTYPES } from '../actions/globalTypes'


const Statussearch = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.STATUSSEARCH:
            return action.payload;
        default:
            return state;
    }
}


export default Statussearch 