const mongoose = require('mongoose')

const userGroupSchema = new mongoose.Schema({
    userGroupName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    userGroupPermission: {
        type: String,
        default: "All"
    },
    userGroupContext: {
        type: String,
        default: ""
    },
    userIdCreate: {
        type: String,
        default: -1
    }
},{timestamps: true});

module.exports = mongoose.model("UserGroup", userGroupSchema);
