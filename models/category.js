const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    productGroupName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    pictures: {
      type: []
    },
    description: {
      type: String,
      required: false,
      maxlenght: 2000
    },
    context: {
      type: String,
      required: false,
      maxlenght: 2000
    },
    context1: {
      type: String,
      required: false,
      maxlenght: 2000
    }
},{timestamps: true});

module.exports = mongoose.model("Category", categorySchema);
