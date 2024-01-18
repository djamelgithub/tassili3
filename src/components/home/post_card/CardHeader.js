import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'

const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
  
    const handleEditPost = () => {
      if (auth && auth.user) {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
      } else {
        // Puedes redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de error
        console.log("Usuario no autenticado. Acceso denegado.");
      }
    };
  
    const handleDeletePost = () => {
      if (auth && auth.user) {
        if (window.confirm("Are you sure want to delete this post?")) {
          dispatch(deletePost({ post, auth, socket }));
          return history.push("/");
        }
      } else {
        // Puedes redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de error
        console.log("Usuario no autenticado. Acceso denegado.");
      }
    };
  
    const handleCopyLink = () => {
      navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    };
  
    return (
      <div className="card_header">
        
  
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
          </span>
  
          <div className="dropdown-menu">
          {(auth && auth.user) && (
        <>
          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons">content_copy</span> Copy Link
          </div>
          {/* Evalúa si el usuario autenticado es el propietario del post o tiene rol de administrador */}
          {(auth.user._id === post.user._id || auth.user.role === 'admin') && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edit Post
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span> Remove Post
              </div>
            </>
          )}
        </>
      )}
  
            <div className="dropdown-item" onClick={handleCopyLink}>
              <span className="material-icons">content_copy</span> Copy Link
            </div>
          </div>
        </div>
      </div>
    );
  };
export default CardHeader  