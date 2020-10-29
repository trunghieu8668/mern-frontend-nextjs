const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandle');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check

exports.signup = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save((error, user)=>{
        if(error) {
          console.log(error._message);
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
          user
        })
    })
}

exports.signin = (req, res)=>{
    // find the user based on email
    const { userEmail, password } = req.body;
    User.findOne({userEmail}, (error, user)=>{
        if(error || !user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        // if user is found make sure the email anh password match

        // create authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }
        // generate a signed token with user id anh secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' })
        //  persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 999, httpOnly: true})
        // return response with user anh token to frontend client
        const {_id, userName, userEmail, role} = user;
        return res.json({token, user: {_id, userEmail, userName, role}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({message: 'Signout success!'})
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["RS256"], // added later
  userProperty: "auth",
  algorithms: ['HS256']
});

exports.isAuth = (req, res, next) =>{
  // let user = req.profile && req.auth && req.profile._id == req.auth._id;
  // if(!user){
  //     return res.status(403).json({
  //         error: "Access denied"
  //     })
  // }
  // next();

  const { authorization } = req.headers;
    if( !authorization ){
        return res.status(401).json({error: "You must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET, (error, payload)=>{
        if(error) {
            return res.status(401).json({error: "You must be logged in"})
        }
        const {_id} = payload
        User.findById(_id)
        .then((userData)=> {
          //console.log(userData);
          res.user = userData
        })
        next()
    })
}

exports.isAdmin = (req, res, next) => {
    // if(req.profile.role === 0) {
    //     return res.status(403).json({
    //         error: "Admin resource! Access denied"
    //     })
    // }
    // next();
    User.findById({_id: req.profile._id}).exec((error, user) => {
      if(!user || error) {
        return res.status(400).json({
          error: 'User not found'
        })
      }
      if(user.role !== 1) {
        return res.status(400).json({
          error: 'Admin resource. Access denied.'
        })
      }
      //req.profile = user;
      next()
    })
}
