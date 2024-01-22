 
const Servicios = require('../models/servicioModel');
const Users = require('../models/userModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;
 this.query = this.query.skip(skip).limit(limit);
 return this;
    }

}

const servicioCtrl = {
    createServicioPendiente: async (req, res) => {
      
        try {
            const {
                content, seguridad, optionservicios, email, telefono, commune, wilaya, planificacionevnevenements, organisasionmariage, mobilierequipement, decorationallefetes, espaceenements, cateringbanquet, locationvoiture, audiovisueLumieres, musiciendirect, robescostumes, maquillagecoiffure,
                navetteinvites, photographievideographie, traiteurestauration, gateaumariage, fleurdecoration, enfants, nettoyage, securite, feuxartifice,   images
            } = req.body;

            if (!images || images.length === 0) {
                return res.status(400).json({ msg: "Veuillez ajouter votre photo." });
            }

            const newServicio = new Servicios({
                content, seguridad, optionservicios, email, telefono, commune, wilaya, planificacionevnevenements, organisasionmariage, mobilierequipement, decorationallefetes, espaceenements, cateringbanquet, locationvoiture, audiovisueLumieres, musiciendirect, robescostumes, maquillagecoiffure,
                navetteinvites, photographievideographie, traiteurestauration, gateaumariage, fleurdecoration, enfants, nettoyage, securite, feuxartifice, images,
                estado: 'pendiente',  user: req.user._id,
            });

            await newServicio.save();

            res.json({
                msg: "Article créé !",
                newServicio: {
                    ...newServicio._doc,
                    user: req.user,
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getServiciosPendientes: async (req, res) => {
        try {
            const features = new APIfeatures(Servicios.find({ estado: 'pendiente' }), req.query).paginating();
     
    
            const servicios = await features.query
                .sort('-createdAt')
                .populate("user likes", "avatar username followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });
    
            
            res.json({
                msg: 'Avaic Succès!',
                result: servicios.length,
                servicios
            });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: err.message });
        }
    },
    
    aprobarServicioPendiente: async (req, res) => {
        try {
            const servicio = await Servicios.findById(req.params.id);
            if (!servicio) return res.status(404).json({ msg: 'Publicación no encontrada' });
            servicio.estado = 'aprobado';

            await servicio.save();
          
            res.json({ msg: 'Servuvuieapprouvé!', _id: servicio._id });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getServicios: async (req, res) => {
        try {

            const { optionservicios } = req.query;
            let query = { estado: 'aprobado' };
            
            // Agregar la condición de búsqueda por el campo 'optionservicios' si es un array
            if (Array.isArray(optionservicios) && optionservicios.length > 0) {
                query.optionservicios = { $in: optionservicios };
            } else if (optionservicios) {
                query.optionservicios = new RegExp(optionservicios, 'i');
            }
            const features = new APIfeatures(Servicios.find(query), req.query).paginating();
         
            const servicios = await features.query.sort('-createdAt')
            .populate("user likes", "avatar username followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: 'Avaic Succès!',
                result: servicios.length,
                servicios
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getServiciossDicover: async (req, res) => {
        try {

            const newArr = [...req.user.following, req.user._id]

            const num  = req.query.num || 9

            const servicios = await Servicios.aggregate([
                { $match: { user : { $nin: newArr } } },
                { $sample: { size: Number(num) } },
            ])

            return res.json({
                msg: 'Success!',
                result: servicios.length,
                servicios
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateServicio: async (req, res) => {
        try {
            const {
                content, seguridad, optionservicios, email, telefono, commune, wilaya, planificacionevnevenements, organisasionmariage, mobilierequipement, decorationallefetes, espaceenements, cateringbanquet, locationvoiture, audiovisueLumieres, musiciendirect, robescostumes, maquillagecoiffure,
                navetteinvites, photographievideographie, traiteurestauration, gateaumariage, fleurdecoration, enfants, nettoyage, securite, feuxartifice, images
            } = req.body;

            const servicio = await Servicios.findOneAndUpdate({ _id: req.params.id }, {
                content, seguridad, optionservicios, email, telefono, commune, wilaya, planificacionevnevenements, organisasionmariage, mobilierequipement, decorationallefetes, espaceenements, cateringbanquet, locationvoiture, audiovisueLumieres, musiciendirect, robescostumes, maquillagecoiffure,
                navetteinvites, photographievideographie, traiteurestauration, gateaumariage, fleurdecoration, enfants, nettoyage, securite, feuxartifice, images
            }).populate("user likes", "avatar username")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: "Updated Servicio!",
                newServicio: {
                    ...servicio._doc,
                    content, seguridad, optionservicios, email, telefono, commune, wilaya, planificacionevnevenements, organisasionmariage, mobilierequipement, decorationallefetes, espaceenements, cateringbanquet, locationvoiture, audiovisueLumieres, musiciendirect, robescostumes, maquillagecoiffure,
                    navetteinvites, photographievideographie, traiteurestauration, gateaumariage, fleurdecoration, enfants, nettoyage, securite, feuxartifice, images
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getServicio: async (req, res) => {
        try {
            const servicio = await Servicios.findById(req.params.id)
            .populate("user likes", "avatar username   followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            if (!servicio) return res.status(400).json({ msg: "Ce poste n'existe pas." });

            res.json({
                servicio
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteServicio: async (req, res) => {
        try {
            const servicio = await Servicios.findOneAndDelete({_id: req.params.id, user: req.user._id})
            await Comments.deleteMany({_id: {$in: servicio.comments }})

            if (!servicio) {
                return res.status(404).json({ msg: "Servicio no encontrado" });
            }
    
            res.json({
                msg: "Supprimer avaic Succès!",
                deletedServicio: servicio
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = servicioCtrl;
