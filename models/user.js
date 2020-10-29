const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1 : uuidv1 } = require('uuid');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    usergroup: {
        type: ObjectId,
        ref: "UserGroup",
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    userEmail: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        required: true
    },
    userDescription: {
        type: String,
        trim: true
    },
    userContext: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
    userLock: {
        type: Boolean,
        default: false
    },
    userSex: {
        type: String,
        default: 0
    },
    userPhone1: {
        type: String,
        default: 0,
        trim: true
    },
    userPhone2: {
        type: String,
        default: 0,
        trim: true
    },
    userAddress: {
        type: String,
        trim: true,
        default: 0
    },
    userAddressProvince: {
        type: String,
        default: 0,
        trim: true
    },
    userAddressDistrict: {
        type: String,
        default: 0,
        trim: true
    },
    userAddressWard: {
        type: String,
        default: 0,
        trim: true
    },
    picture: {
        type: String,
        default: ""
    },
    userIdCreate: {
        type: ObjectId,
        ref: 'User'
    },
    lastDate: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String,
        default: ""
    }
},{timestamps: true});

// virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex')
        }
        catch(err) {
            return err;
        }
    }
}

module.exports = mongoose.model("User", userSchema);
