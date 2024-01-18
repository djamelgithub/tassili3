import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
 

 
 
 const Statusservicioo = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="status my-2 d-flex">
    <button
      className="statusBtn flex-fill"
      onClick={() => dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: true })}
    >
        Publiez vos Service 
 
    </button>
  </div>
  );
};

 
 export default Statusservicioo
 

