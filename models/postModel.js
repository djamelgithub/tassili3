const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 50
  },
  direcion: {
    type: [String],
    required: false,
    maxlength: 50
  },
  wilaya: {
    type: String,
    required: false,
    maxlength: 50
  },
  commune: {
    type: String,
    required: false,
    maxlength: 50
  },
  personName: {
    type: Array,
    required: false,
    maxlength: 250
  },

  price: {
    type: [Number],
    required: true,
  },

  eventos: {
    type: Array,
    required: false,
    maxlength: 250
  },

  nombreapellido: {
    type: String,
    required: false,
    maxlength: 50

  },
  telefono: {
    type: String,
    required: false,
    maxlength: 50
  },
  email: {
    type: String,
    eventos: {
      type: Array,
      required: false,
      maxlength: 50
    },

    option: {
      type: String,
      required: false,
      maxlength: 50
    },

    capacidad: {
      type: String,
      required: false,
      maxlength: 300
    },
    invitados: {
      type: String,
      required: false,
      maxlength: 300
    },
    restaurante: {
      type: String,
      required: false,
      maxlength: 300
    },
    decoracion: {
      type: String,
      required: false,
      maxlength: 300
    },

    musica: {
      type: String,
      required: false,
      maxlength: 300
    },
    disponibilidad: {
      type: String,
      required: false,
      maxlength: 300
    },
    parking: {
      type: String,
      required: false,
      maxlength: 300
    },



    autre: {
      type: String,
      required: false,
      maxlength: 300
    },



  },
  images: {
    type: Array,
    required: true,
    maxlength: 7

  },
  estado: { type: String, enum: ['pendiente', 'aprobado', 'eliminado'], default: 'pendiente' },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
  user: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
  timestamps: true,
});

module.exports = mongoose.model('post', postSchema);
