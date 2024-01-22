const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

 
router.get('/posts', postCtrl.getPosts);
 
 
router.post('/posts_pendientes',auth, postCtrl.createPostPendiente);

 
router.get('/postspendientes', auth, postCtrl.getPostsPendientes);

 
router.patch('/posts_pendientes/:id/aprobar', auth, postCtrl.aprobarPostPendiente);

 
router.patch('/post/:id', auth, postCtrl.updatePost);

 
router.delete('/post/:id', auth, postCtrl.deletePost);


router.get('/post/:id',  postCtrl.getPost)
router.patch('/post/:id/like', auth, postCtrl.likePost)

router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)

router.get('/user_posts/:id', auth, postCtrl.getUserPosts)

 

router.patch('/savePost/:id', auth, postCtrl.savePost)

router.patch('/unSavePost/:id', auth, postCtrl.unSavePost)

router.get('/getSavePosts', auth, postCtrl.getSavePosts)


module.exports = router