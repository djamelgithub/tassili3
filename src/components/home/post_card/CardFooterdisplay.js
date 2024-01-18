import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
 
import { Favorite, FavoriteBorder,  SendOutlined } from '@mui/icons-material';

import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config'
 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useSelector, useDispatch } from 'react-redux'
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction'
import { IconButton } from '@mui/material';
 
const CardFooterdisplay = ({ post }) => {
  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()
  const [isShare, setIsShare] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)
 

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(likePost({ post, auth, socket }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(unLikePost({ post, auth, socket }))
    setLoadLike(false)
  }


  // Saved
  useEffect(() => {
    if (auth.user.saved.find(id => id === post._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [auth.user.saved, post._id])

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true)
    await dispatch(savePost({ post, auth }))
    setSaveLoad(false)
  }

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true)
    await dispatch(unSavePost({ post, auth }))
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
          onClick={saved ? handleUnSavePost : handleSavePost}
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
          {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
          <SendOutlined style={{ color: isShare ? '#fff' : '#3498db' }} />
        </IconButton>
      </Box>
      <div>
      <div>
      <Typography
        variant="body2"
        className={`like-animation ${liked ? 'liked' : ''}`}
        onClick={handleLikeClick}
      >
        <ThumbUpIcon fontSize="small" sx={{ marginBottom: '-2px', marginRight: '4px', color: liked ? 'green' : 'black' }} />
      <span className="like-count" style={{ color: liked ? 'green' : 'black' }}>
        Like  {liked ? post.likes.length + 1 : post.likes.length}
        </span>
      </Typography>
    </div>
    </div>
    </Box>
  </CardContent>
</Card>


    </div>
  )
}

export default CardFooterdisplay
