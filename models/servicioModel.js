
 
 
  const mongoose = require('mongoose');
 
  
  
  const ServicioSchema = new mongoose.Schema({
    content: {
      type: String,
      required: false
    },
  
    optionservicios: {
      type: String,
      required: false
    },
  
    planificacionevnevenements: {
      type: String,
      required: false
    },
    organisasionmariage: {
      type: String,
      required: false
    },
    mobilierequipement: {
      type: String,
      required: false
    },
    decorationallefetes: {
      type: String,
      required: false
    },
    espaceenements: {
      type: String,
      required: false
    },
    cateringbanquet: {
      type: String,
      required: false
    },
    locationvoiture: {
      type: String,
      required: false
    },
    audiovisueLumieres: {
      type: String,
      required: false
    },
    musiciendirect: {
      type: String,
      required: false
    },
    robescostumes: {
      type: String,
      required: false
    },
    maquillagecoiffure: {
      type: String,
      required: false
    },
    navetteinvites: {
      type: String,
      required: false
    },
    photographievideographie: {
      type: String,
      required: false
    },
    traiteurestauration: {
      type: String,
      required: false
    },
    gateaumariage: {
      type: String,
      required: false
    },
    fleurdecoration: {
      type: String,
      required: false
    },
    enfants: {
      type: String,
      required: false
    },
    nettoyage: {
      type: String,
      required: false
    },
    securite: {
      type: String,
      required: false
    },
    feuxartifice: {
      type: String,
      required: false
    },
    wilaya: {
      type: String,
      required: false,
    },
    commune: {
      type: String,
      required: false,
    },
    
    telefono: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    estado: { type: String, enum: ['pendiente', 'aprobado', 'eliminado'], default: 'pendiente' },

    images: {
        type: Array,
        required: true,
      },
     likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
      //comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
      user: {type: mongoose.Types.ObjectId, ref: 'user'}
    }, {
      timestamps: true,
    });
 
  module.exports = mongoose.model('servicio', ServicioSchema)