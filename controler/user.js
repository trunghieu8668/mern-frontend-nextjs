const User = require('../models/user')
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandle');
const { Order } = require('../models/order')

exports.userById = (req, res, next, id)=>{
    User.findById(id).exec((error, user)=>{
        if(error || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        try {
            req.profile = user;
        }
        catch{(error)=>{
            return error;
            }
        }
        next();
    })
}

exports.read = (req, res)=> {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.update = (req, res) => {
    // User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {
    //     if(err) {
    //         return res.status(400).json({
    //             error: 'You are not authorized to perform this action'
    //         })
    //     }
    //     user.hashed_password = undefined;
    //     user.salt = undefined;
    //     res.json(user)
    //
    // })
    const { userName, password } = req.body;

    User.findOne({ _id: req.profile._id }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!userName) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.userName = userName;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
}

exports.addOrderToUserHistory = (req, res, next) => {
  let history = []
  req.body.order.products.forEach((item, i) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    })
  });
  User.findOneAndUpdate({_id: req.profile._id}, {$push: { history: history }}, {new: true}, (error, data) => {
    if(error) {
      return res.status(400).json({
        error: 'Could not update user purchase history'
      })
    }
    next();
  } )
}

exports.purchaseHistory = (req, res) => {
  Order.find({user: req.profile._id})
  .populate('user', '_id UserName')
  .sort('-created')
  .exec((error, orders)=> {
    if(error) {
      return res.status(400).json({
        error: errorHandler(error)
      })
    }
    res.json(orders)
  })
}
