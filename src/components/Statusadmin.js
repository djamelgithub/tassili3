import React from 'react'
 
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'

const Statussearch = () => {
    const {  } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div className="status my-3 d-flex">
       
            
            <button className="statusBtn flex-fill"
            onClick={() => dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: true })}>
               , what are you thinking?
            </button>
        </div>
    )
}

export default Statussearch
