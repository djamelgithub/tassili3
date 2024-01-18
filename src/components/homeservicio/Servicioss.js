import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
 
import { SERVICIO_TYPES } from '../../redux/actions/servicioAction'
 
import ServicioCard from '../ServicioCard'
 

const Servicioss = () => {
   
        const { homeServicios, auth, theme } = useSelector(state => state)
        const dispatch = useDispatch()
    
        const [load, setLoad] = useState(false)
    
        const handleLoadMore = async () => {
            setLoad(true)
            const res = await getDataAPI(`servicios?limit=${homeServicios.page * 9}`, auth.token)
    
            dispatch({
                type: SERVICIO_TYPES.GET_SERVICIOS, 
                payload: {...res.data, page: homeServicios.page + 1}
            })
    
            setLoad(false)
        }
    
        return (
            <div className="post_thumb">
                {
                    homeServicios.servicios.map(servicio => (
                        <ServicioCard key={servicio._id} servicio={servicio} theme={theme} />
                    ))
                }
    
                {
                    load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                }
    
                
                <LoadMoreBtn result={homeServicios.result} page={homeServicios.page}
                load={load} handleLoadMore={handleLoadMore} />
            </div>
        )
    }
    
export default Servicioss;
