import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Favorite, FavoriteBorder,   SendOutlined } from '@mui/icons-material';
  
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config'

import { useSelector, useDispatch } from 'react-redux'
import { likeServicio, unLikeServicio, saveServicio, unSaveServicio } from '../../../redux/actions/servicioAction'
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';

const CardFooterdisplay = ({ servicio }) => {
 
  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()
  const [isShare, setIsShare] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)


  useEffect(() => {
    if (servicio.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [servicio.likes, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(likeServicio({ servicio, auth, socket }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(unLikeServicio({ servicio, auth, socket }))
    setLoadLike(false)
  }


  // Saved
  useEffect(() => {
    if (auth.user.saved.find(id => id === servicio._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [auth.user.saved, servicio._id])

  const handleSaveServicio= async () => {
    if (saveLoad) return;

    setSaveLoad(true)
    await dispatch(saveServicio({ servicio, auth }))
    setSaveLoad(false)
  }

  const handleUnSaveServicio = async () => {
    if (saveLoad) return;

    setSaveLoad(true)
    await dispatch(unSaveServicio({ servicio, auth }))
    setSaveLoad(false)
  }

  return (
    <div>
 <Card>
  <CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton
          variant="contained"
          color="primary"
          size="small"
          sx={{ backgroundColor: isLike ? '#3498db' : '#fff', '&:hover': { backgroundColor: isLike ? '#2980b9' : '#eee' } }}
          onClick={isLike ? handleUnLike : handleLike}
        >
          {isLike ? <Favorite style={{ color: '#fff' }} /> : <FavoriteBorder style={{ color: '#3498db' }} />}
        </IconButton>
        <IconButton
          variant="contained"
          color="primary"
          size="small"
          sx={{ backgroundColor: saved ? '#27AE60' : '#fff', '&:hover': { backgroundColor: saved ? '#219653' : '#eee' } }}
          onClick={saved ? handleUnSaveServicio : handleSaveServicio}
        >
          {saved ? (
            <i className="fas fa-bookmark text-info" style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }} />
          ) : (
            <i className="far fa-bookmark" style={{ fontSize: '20px', color: '#333', cursor: 'pointer' }} />
          )}
        </IconButton>
        <IconButton
          variant="contained"
          color="primary"
          size="small"
          sx={{ backgroundColor: isShare ? '#3498db' : '#fff', '&:hover': { backgroundColor: isShare ? '#2980b9' : '#eee' } }}
          onClick={() => setIsShare(!isShare)}
        >
          {isShare && <ShareModal url={`${BASE_URL}/servicio/${servicio._id}`} />}
          <SendOutlined style={{ color: isShare ? '#fff' : '#3498db' }} />
        </IconButton>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#fff', marginLeft: 1 }}>
        Likes: {likeServicio.length}
      </Typography>
    </Box>
  </CardContent>
</Card>


    </div>
  )
}

export default CardFooterdisplay
