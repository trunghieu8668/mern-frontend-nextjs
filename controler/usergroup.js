const UserGroup = require('../models/usergroup')
const { errorHandler } = require('../helpers/dbErrorHandle');

exports.userGroupById = (req, res, next, id) => {
    UserGroup.findById(id).exec((error, usergroup) =>{
        if(error || !category) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        req.usergroup = category;
        next();
    })
}

exports.create = (req, res) =>{
    const usergroup = new UserGroup(req.body);
    usergroup.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({data});
    })
}

exports.read = (req, res) =>{
    return res.json(req.usergroup);
}

exports.update = (req, res) => {
    const usergroup = req.usergroup;
    usergroup.userGroupName = req.body.userGroupName;
    usergroup.save((error, data)=>{
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data);
    })
}

exports.remove = (req, res) => {
    const usergroup = req.usergroup;
    usergroup.remove((error, data)=>{
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            data,
            message: "UserGroup deleted"
        });
    })
}

exports.list = (req, res) => {
    UserGroup.find().exec((error, data)=>{
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data);
    })
}
