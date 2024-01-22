const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
   role: {
        type: String,
        enum: ['bloqueado', 'user', 'superuser', 'moderador' , 'admin'],
        default: 'user'
    },


   

    bloquecomment: {
        type: String,
        enum: ['non-bloque-comment','bloque-comment'],
        default: 'non-bloque-comment'
    },
    bloquepost: {
        type: String,
        enum: ['non-bloque-post','bloque-post',  'bloque-user' , 'non-bloque-user'],
        default: 'non-bloque-post'
    },

 
 
mobile: {type: String, default: ''},
address: {type: String, default: ''},
story: {
    type: String, 
    default: '',
    maxlength: 200
},
    website: { type: String, default: '' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }],

  
    posts: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
  
    servicios: [{ type: mongoose.Types.ObjectId, ref: 'servicio' }],



}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)