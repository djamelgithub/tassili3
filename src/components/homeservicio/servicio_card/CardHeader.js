import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deleteServicio } from '../../../redux/actions/servicioAction'
import { BASE_URL } from '../../../utils/config'

const CardHeader = ({ servicio }) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEditServicio = () => {
        dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: { ...servicio, onEdit: true } })
    }

    const handleDeleteServicio = () => {
        if (window.confirm("Are you sure want to delete this servicio?")) {
            dispatch(deleteServicio({ servicio: servicio, auth, socket }))
            return history.push("/")
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${servicio._id}`)
    }

    return (
        <div className="card_header">
         

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    {
                        (auth.user._id === servicio.user._id || auth.user.role === 'admin') && (
                            <>
                                <div className="dropdown-item" onClick={handleEditServicio}>
                                    <span className="material-icons">create</span> Edit Servicio
                                </div>
                                <div className="dropdown-item" onClick={handleDeleteServicio}>
                                    <span className="material-icons">delete_outline</span> Remove Servicio
                                </div>
                            </>
                        )
                    }

                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader
