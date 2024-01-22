const router = require('express').Router();
const servicioCtrl = require('../controllers/servicioCtrl'); // Importar el nuevo controlador
const auth = require('../middleware/auth');
 
router.get('/servicios', servicioCtrl.getServicios);

 
router.post('/servicios_pendientes',auth, servicioCtrl.createServicioPendiente);

 
router.get('/servicios_pendientes', auth, servicioCtrl.getServiciosPendientes);
 
 
router.patch('/servicios_pendientes/:id/aprobar', auth, servicioCtrl.aprobarServicioPendiente);
 
router.get('/servicio/:id',   servicioCtrl.getServicio)

router.route('/servicio/:id')
  .patch(auth, servicioCtrl.updateServicio)  
             
  .delete(auth, servicioCtrl.deleteServicio) 
 
 /* router.patch('/servicio/:id/like', auth, servicioCtrl.likeServicio)
  
  router.patch('/servicio/:id/unlike', auth, servicioCtrl.unLikeServicio)
  
  router.get('/user_servicios/:id', auth, servicioCtrl.getUserServicios)
  */
   
   
  
module.exports = router;
