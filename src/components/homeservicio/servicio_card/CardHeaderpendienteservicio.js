
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
 
import { aproveServiciosPendientesAction, deleteServiciopendiente } from '../../../redux/actions/servicioaproveAction'
 
const CardHeaderpendienteservicio = ({ servicio }) => {

    const { auth, socket } = useSelector(state => state)

    const dispatch = useDispatch()

    const history = useHistory(

    )
    const handleAproveservicio = () => {
 
        const confirmAction = window.confirm("¿Deseas aprobar esta post?")
        if (confirmAction) {
            dispatch(aproveServiciosPendientesAction(servicio, 'aprobado', auth));
            return history.push("/pages/administracion/sala");
        }
    };



    const handleDeleteservicio = () => {
        if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
            dispatch(deleteServiciopendiente({ servicio, auth, socket }))
            return history.push("/pages/administracion/sala")
        }
    }



 

    return (
        <div className="card_header">


            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {
                        auth.user.role === 'admin' && (
                            <>
                                <div className="dropdown-item" onClick={handleAproveservicio}>
                                    <span className="material-icons">create</span> Approuver la publication
                                </div>
                                <div className="dropdown-item" onClick={handleDeleteservicio}>
                                    <span className="material-icons">delete_outline</span> Supprimer la publication
                                </div>
                            </>
                        )
                       
                       
                  
                    }


                    <div className="dropdown-item"  >
                        <span className="material-icons">content_copy</span>  copy lo lient
                    </div>
                </div>
            </div>


        </div>
    )
}
export default CardHeaderpendienteservicio