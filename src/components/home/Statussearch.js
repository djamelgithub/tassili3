import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
 
 
 
 const Statussearch = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="status my-2 d-flex">
    <button
      className="statusBtn flex-fill"
      onClick={() => dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: true })}
    >
        status search
 
    </button>
  </div>
  );
};

 
 export default Statussearch
 

