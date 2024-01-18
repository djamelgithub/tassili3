import { ROLES_TYPES } from "../../actions/roles/roleAction";

 
 
const initialState = {
  role: "",
  user: null,
 
};
const roleeReducer = (state = initialState, action) => {
 
    switch (action.type) {
        case ROLES_TYPES.USER_ROLENOIDANTIFIE:
          return {
            ...state,
            role: "Utilisateur-No-authentifié",
            user: action.payload.user
          };
        case ROLES_TYPES.USER_ROLE:
          return {
            ...state,
            role: "user",
            user: action.payload.user
          };
    
        case ROLES_TYPES.SUPERUSER_ROLE:
          return {
            ...state,
            role: "superuser",
            user: action.payload.user
          };
    
        case ROLES_TYPES.MODERADOR_ROLE:
          return {
            ...state,
            role: "Moderateur",
            user: action.payload.user
          };
    
          case ROLES_TYPES.ADMIN_ROLE:
            return {
              ...state,
              role: "admin",
              user: action.payload.user
            };
      
    
        default:
          return state;
      }
    };
    

export default roleeReducer
