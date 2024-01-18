
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import ServicioCard from '../ServicioCard';
import { SERVICIOPENDIENTE_TYPES } from '../../redux/actions/servicioaproveAction';

const Serviciospendientes = () => {


  const { servicioaproveReducer, auth, theme } = useSelector((state) => state);
 console.log(servicioaproveReducer.posts)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false);
  const [servicios, setServicios] = useState([]);


  useEffect(() => {// La lógica que estás implementando parece una solución válida. Filtras los posts pendientes del estado global homepostaprove y los almacenas en un estado local posts. Al hacer esto en el useEffect que se ejecuta cada vez que homepostaprove.posts se actualiza, logras que el componente reaccione y actualice la lista local de posts pendientes.
    // Esta implementación permite tener un control más directo sobre qué posts se deben mostrar en el componente Postssspendientes, ya que estás manejando el estado local de forma separada.
    const servicionspendientes = servicioaproveReducer.servicios.filter((p) => p.estado === 'pendiente');
    setServicios(servicionspendientes);
  }, [servicioaproveReducer.servicios]);


  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`servicios_pendientes?limit=${servicioaproveReducer.page * 9}`, auth.token);

    dispatch({
      type: SERVICIOPENDIENTE_TYPES.APROVE_SERVICIO_PENDIENTE,
      ...res.data, page: servicioaproveReducer.page + 1
    })
    setLoad(false);
  };

  return (
    <div className="post_thumb">
      { servicios.map((servicio) => (
        <ServicioCard key={servicio._id} servicio={servicio} theme={theme} />
      ))}

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn result={servicioaproveReducer.result} page={servicioaproveReducer.page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
};


export default Serviciospendientes
