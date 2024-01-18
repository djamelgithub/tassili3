import { SERVICIOPENDIENTE_TYPES } from "../actions/servicioaproveAction";

 
const initialState = {
 
  servicios: [], // Nuevo estado para los posts pendientes
  loading: false,
  page: 2,
  result: 0,
};
 
const servicioaproveReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICIOPENDIENTE_TYPES.CREATE_SERVICIOPENDIENTE:
      return {
        ...state,
        servicios: [action.payload, ...state.servicios]
      };
    case SERVICIOPENDIENTE_TYPES.LOADING_SERVICIO:
      return {
        ...state,
        loading: action.payload
      };
    case SERVICIOPENDIENTE_TYPES.GET_SERVICIOS_PENDIENTES:
      return {
        ...state,
        servicios: action.payload.servicios,
        result: action.payload.result,
        page: action.payload.page
      };
   
   
      case SERVICIOPENDIENTE_TYPES.APROVE_SERVICIO_PENDIENTE:
        const updatedservicio = state.servicios.map((servicio) =>
       servicio._id === action.payload._id
          ? { ...servicio, estado: 'aprobado' }
          :servicio
      );
      return {
        ...state,
        servicios: updatedservicio,
      };

    default:
      return state;
  }
};

export default servicioaproveReducer;
