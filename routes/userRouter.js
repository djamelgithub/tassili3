const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require("../middleware/auth")
 
router.get('/users', auth, userCtrl.getUsers)

 router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)
 
router.patch('/user', auth, userCtrl.updateUser)

router.patch('/user/:id/follow', auth, userCtrl.follow)
router.patch('/user/:id/unfollow', auth, userCtrl.unfollow)

router.get('/suggestionsUser', auth, userCtrl.suggestionsUser)

router.patch('/user/:id/roleusernoidantificado', auth, userCtrl.UserRoleNoIdentificado);
router.patch('/user/:id/roleuser', auth, userCtrl.assignUserRole);
router.patch('/user/:id/rolesuperuser', auth, userCtrl.assignSuperUserRole);
router.patch('/user/:id/rolemoderador', auth, userCtrl.assignModeratorRole);
router.patch('/user/:id/roleadmin', auth, userCtrl.assignAdminRole);

router.patch('/user/:id/sinbloqueocomment', auth, userCtrl.NoestaBloqueadocomment);
router.patch('/user/:id/bloqueocomment', auth, userCtrl.Bloqueadocomment);

router.patch('/user/:id/sinbloqueopost', auth, userCtrl.Nobloqueadopost);
router.patch('/user/:id/bloqueopost', auth, userCtrl.Bloqueadopost);

router.patch('/user/:id/sinbloqueouser', auth, userCtrl.bloquearelusuario);
router.patch('/user/:id/bloqueouser', auth, userCtrl.dejarelbloqueo);

module.exports = router