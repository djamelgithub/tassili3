const Users = require("../models/userModel");


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({ username: { $regex: req.query.username } })
                .limit(10).select("username   avatar")

            res.json({ users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsers: async (req, res) => {
        try {
            const features = new APIfeatures(Users.find({}), req.query).paginating();
    
            const users = await features.query
                .sort('-createdAt')
                .populate("posts post likes", "likes comments content avatar username role followers")
                .populate({
                    path: "posts",
                    populate: {
                        path: "likes comments",
                        select: "-password"
                    }
                })
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })
                .populate({
                    path: 'servicios',
                    select: 'content ' // Especifica los campos que deseas obtener
                });
                
            // Ahora, para cargar los posts de cada usuario
            await Users.populate(users, {
                path: 'posts',
                populate: {
                    path: 'user', // Nombre del campo de referencia en el modelo de Post
                    select: 'username avatar role', // Campos que deseas seleccionar del usuario asociado al post
                },
            });
    
            console.log(users);
    
            res.json({
                msg: 'Success!',
                result: users.length,
                users
            });
    
        } catch (err) {
            console.error("Error en getUsers:", err);
            return res.status(500).json({ msg: err.message });
        }
    },
    

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
                .populate("followers following", "-password")
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { avatar, username, mobile, address, story, website } = req.body
            if (!username) return res.status(400).json({ msg: "Please add your user name." })

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                avatar, username, mobile, address, story, website,
            })

            res.json({ msg: "Update Success!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    follow: async (req, res) => {
        try {
            const user = await Users.find({ _id: req.params.id, followers: req.user._id })
            if (user.length > 0) return res.status(500).json({ msg: "You followed this user." })

            const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true }).populate("followers following", "-password")

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: req.params.id }
            }, { new: true })

            res.json({ newUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    unfollow: async (req, res) => {
        try {

            const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.user._id }
            }, { new: true }).populate("followers following", "-password")

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { following: req.params.id }
            }, { new: true })

            res.json({ newUser })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    suggestionsUser: async (req, res) => {
        try {
            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 10

            const users = await Users.aggregate([
                { $match: { _id: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
                { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
                { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
            ]).project("-password")

            return res.json({
                users,
                result: users.length
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    UserRoleNoIdentificado: async (req, res) => {

        const { role } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(req.params.id, { role }, { new: true });;
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de usuario asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado ' });
        }
    },


    assignUserRole: async (req, res) => {

        const { role } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(req.params.id, { role }, { new: true });;
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de usuario asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado ' });
        }
    },

    // Asignar un rol de superusuario al usuario
    assignSuperUserRole: async (req, res) => {

        const { role } = req.body;
        try {
            const user = await Users.findByIdAndUpdate(req.params.id, { role }, { new: true });
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de superusuario asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado s' });
        }
    },

    // Asignar un rol de moderador al usuario
    assignModeratorRole: async (req, res) => {

        const { role } = req.body;
        try {
            const user = await Users.findByIdAndUpdate(req.params.id, { role }, { new: true });
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de moderador asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado ' });
        }
    },

    // Asignar un rol de administrador al usuario
    assignAdminRole: async (req, res) => {

        const { role } = req.body;
        try {
            const user = await Users.findByIdAndUpdate(req.params.id, { role }, { new: true });
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de administrador asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado ' });
        }
    },



    NoestaBloqueadocomment: async (req, res) => {

        const { bloquecomment } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(req.params.id, { bloquecomment }, { new: true });;
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de usuario asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado ' });
        }
    },

    Bloqueadocomment: async (req, res) => {

        const { bloquecomment } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(
                req.params.id,
                { bloquecomment },
                { new: true }
            );
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'Rol de usuario asignado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al actualizar de usuario asignado ' });
        }
    },
    Nobloqueadopost: async (req, res) => {
        const { bloquepost } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(
                req.params.id,
                { bloquepost },
                { new: true }
            );
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'usuario desbloqueado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al desbloquear usuario ' });
        }
    },
    Bloqueadopost: async (req, res) => {
        const { bloquepost } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(
                req.params.id,
                { bloquepost },
                { new: true }
            );
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'useario bloqueado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al bloquear el usuario ' });
        }
    },

    bloquearelusuario: async (req, res) => {
        const { bloquepost } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(
                req.params.id,
                { bloquepost },
                { new: true }
            );
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'useario bloqueado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al bloquear el usuario ' });
        }
    },



    dejarelbloqueo: async (req, res) => {
        const { bloquepost } = req.body;

        try {
            const user = await Users.findByIdAndUpdate(
                req.params.id,
                { bloquepost },
                { new: true }
            );
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            res.json({ msg: 'useario bloqueado exitosamente' });
        } catch (error) {
            (error);
            res.status(500).json({ msg: 'Error al bloquear el usuario ' });
        }
    },




}


module.exports = userCtrl