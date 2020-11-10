const formidable = require('formidable')
var async = require('async');
const _ = require('lodash');
const fs = require('fs')
const { errorHandler } = require('../helpers/dbErrorHandle');
const { upload } = require('./cloudinary');
const Product = require('../models/product');
const { nextTick } = require('process');
const { parseInt } = require('lodash');
const slugify = require("slugify");

exports.productById = async (req, res, next,id) => {
    await Product.findById(id).exec((err, product)=>{
        if(err || !product) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next()
    })
}

exports.read = (req, res) => {
    //req.product.photo = undefined;
    //req.product.pictures = undefined;
    return res.json(req.product);
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deleteProduct)=>{
        if(err){
          return res.status(400).json({
              error: errorHandler(err)
          })
        }
        res.json({
          deleteProduct, message: "Product deleted seccessfully"
        })
    })
}

// exports.create = (req, res) => {
//     let form = new formidable.IncomingForm()
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files)=>{
//         if(err) {
//             return res.status(400).json({
//                 error: "Imgage could not be uploaded"
//             })
//         }
//         // check for all fields
//         const { name, description, price, category, quantity, shipping } = fields;
//         if( !name || !description || !price || !category || !quantity || !shipping  ) {
//             return res.status(400).json({
//                 error: "All fields are required"
//             })
//         }
//         let product = new Product(fields)
//         // 1kb = 1000;
//         // 1mb = 1000000
//         if(files.photo) {
//             if(files.photo.size > 1000000) {
//                 return res.status(400).json({
//                     error: "Image should be less than 1Mb in size"
//                 })
//             }
//             product.photo.data = fs.readFileSync(files.photo.path)
//             product.photo.contentType = files.photo.type
//         }
//         product.save((err, result)=>{
//             if(err) {
//                 return res.status(400).json({
//                     error: errorHandler(err)
//                 })
//             }
//             result.photo = undefined;
//             res.json(result);
//         })
//     })
// }

exports.create = async (req, res) => {
  try {
    //console.log(req.body);
    if (req.body.productName) {
      req.body.slug = slugify(req.body.productName);
    }
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};
exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files)=>{
        let product = req.product;
        product = _.extend(product, fields);
        product.save((err, result)=>{
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}

exports.update3 = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.productName) {
      req.body.slug = slugify(req.body.productName);
    }
    const updated = await Product.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.update2 = async (req, res, next) => {
    const pictures = req.files;
    console.log('req.body', req.body);
    try {
      const fields = req.body
      let product = req.product;
      product = _.extend(product, fields);
      let urls = [];
      let multiple = async (path) => await upload(path);
      for (const file of pictures) {
        const {path} = file;
        console.log("path", file);
        const newPath = await multiple(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      if (urls.length) {
        let productw = _.extend(product, {pictures: urls});
        let new_product = new Product(productw)
        await new_product.save((err, result)=>{
          if(err) {
            return res.status(400).json({
              error: errorHandler(err)
            })
          }
          //result.photo = undefined;
          res.json(result);
        })
      }
      else {
        product.save((err, result)=>{
          if(err) {
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }
          //result.pictures = undefined;
          res.json(result);
        })
      }
    } catch (e) {
      console.log("err :", e);
      return next(e);
    }
}
/**
* sell/arrival
* by sell: /products?sortBy=sold&order=desc&limit=4
* by arrival: /products?sortBy=createAt&order=desc&limit=4
* if no parrams are sent, then all product are returned
**/

exports.list = async (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    await Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products)=>{
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        res.send(products)
    })
}

exports.totalProducts = async (req, res) => {
   await Product.countDocuments(function(error, product) {
     if(error || !product) {
         return res.status(400).json({
             error: "Product not found"
         })
     }
     res.json(product)
  });
}

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
**/
exports.listRelated = async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    const product = await Product.find({_id: { $ne: req.product }, category: req.product.category})
    .select(["pictures", "productName", "status2", "productPriceNew"])
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products)=>{
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        res.json(products)
    })
}

exports.listCategories = async (req, res) => {
    await Product.distinct("category", {}, (err, categories) => {
        if(err) {
            return res.status(400).json({
              error: "Products not found"
            })
        }
        res.json(categories)
    })
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.listBySearch = async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
          if (key === "productPriceNew") {
              // gte -  greater than price [0-10]
              // lte - less than
              findArgs[key] = {
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              };
          } else {
              findArgs[key] = req.body.filters[key];
          }
      }
  }
  let countQuery = function(callback){
    return Product.countDocuments(findArgs, function(err, count){
          if(err){ callback(err, null) }
          else{
              callback(null, count);
           }
    })
  };

  // const totalItem = Product.find(findArgs).select("_id").countDocuments(function(error, product) {
  //   if(error || !product) {
  //     return res.json(0)
  //   }
  //   res.json(product)
  // });
  // console.log(totalItem);
  var retrieveQuery = function(callback){
    return Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        // if (err) {
        //   return res.status(400).json({
        //     error: "Products not found"
        //   });
        // }
        // res.json({
        //   size: data.length,
        //   //totalItem: totalItem,
        //   data
        // });
        if(err){ callback(err, data) }
        else{
          callback(null, data);
        }
      });
  }
  async.parallel([countQuery, retrieveQuery], function(err, results){
       //err contains the array of error of all the functions
       //results contains an array of all the results
       //results[0] will contain value of doc.length from countQuery function
       //results[1] will contain doc of retrieveQuery function
       //You can send the results as

       res.json({size: results[1].length, data: results[1], totalCount: results[0]});

  });
}



exports.photo = async (req, res, next) => {
    if(req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.listSearch = async (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    const limit = 6;
    // assign search value to query.name
    if (req.query.search) {
        query.productName = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        // await Product.find(query, (err, products) => {
        //     if (err) {
        //         return res.status(400).json({
        //             error: errorHandler(err)
        //         });
        //     }
        //     res.json(products);
        // }).select('-photo').limit(limit);
        const product = await Product.find(query).select('-photo').limit(limit).exec();
        const total = await Product.countDocuments(query).exec()
        res.json({product,total})
    }
};

exports.totalBySearch = async (req, res) => {
  let findArgs = {};
  for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
          if (key === "price") {
              // gte -  greater than price [0-10]
              // lte - less than
              findArgs[key] = {
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              };
          } else {
              findArgs[key] = req.body.filters[key];
          }
      }
  }
  Product.countDocuments(findArgs, function(err, count){
    if (err) {
      return res.status(400).json({
          error: errorHandler(err)
      });
    }
    res.json(count);
  })
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item)=> {
    return {
      updateOne: {
        filter: {_id: item._id},
        update: {$inc: {quantity: -item.count, sold: +item.count}}
      }
    }
  });
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if(error) {
      return res.status(400).json({
        error: "Could not update product"
      })
    }
    next()
  })
}

exports.getStatusValues = (req, res) => {
  try {
    res.json(Product.schema.path("status2").enumValues)
  }
  catch (error) {
     console.log(error);
   }
}

/*Home Product => Latest*/
exports.homeProductListByStatus = async (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    await Product.find()
    .select(["productName", "productPriceNew", "createdAt", "pictures", "status2"])
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products)=>{
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            })
        }
        res.send(products)
    })
}
