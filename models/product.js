const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const ProductPictureSchema = new mongoose.Schema({
  src: String,
  alt: String,
  attr: String
},
{
  timestamps: true
})
const Picture = mongoose.model("Picture", ProductPictureSchema);

const ProductSchema = new mongoose.Schema({
    productName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
      index: { unique: true }
    },
    productName2: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    productSerial: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
      index: { unique: true }
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
    },
    context2: {
      type: String,
      required: false,
      maxlenght: 2000
    },
    context3: {
      type: String,
      required: false,
      maxlenght: 2000
    },
    context4: {
      type: String,
      required: false,
      maxlenght: 2000
    },
    productPriceNew: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
      maxlength: 32
    },
    productPriceVirtual: {
      type: Number,
      trim: true,
      default: 0,
      maxlength: 32
    },
    productPriceOld: {
      type: Number,
      trim: true,
      default: 0,
      maxlength: 32
    },
    productPriceAgent: {
      type: Number,
      trim: true,
      default: 0,
      maxlength: 32
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      maxlength: 32,
      required: true
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
      maxlenght:32,
      required: false
    },
    productIds: {
      type: ObjectId,
      ref: "Product",
      required: false
    },
    productIds2: {
      type: ObjectId,
      ref: "Product",
      required: false
    },
    quantity: {
      type: Number,
    },
    warranty: {
      type: Number
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    pictures: {
      type: []
    },
    sold: {
      type: Number,
      default: 0
    },
    visit: {
      type: Number,
      default: 0
    },
    topLevel: {
      type: Number,
      default: 1
    },
    status: {
      required: false,
      type: Boolean,
      default: true
    },
    status2: {
      type: String,
      default: "Bình thường",
      enum: ["Bình thường", "Còn hàng", "Bán chạy", "Hết hàng", "Ngừng kinh doanh"] // enum means string objects
    },
    vat: {
      type: Boolean,
      default: true
    },
    shipping: {
      required: false,
      type: Boolean
    },
    tag: {
      type: ObjectId,
      ref: "Tags"
    },
    metaTitle: {
      type: String,
      required: false
    },
    metaDescription: {
      type: String,
      required: false
    },
    metaKeyword: {
      type: String,
      required: false
    }
},{timestamps: true});
module.exports = mongoose.model("Product", ProductSchema);
