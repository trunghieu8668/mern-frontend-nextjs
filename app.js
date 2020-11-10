const express = require ('express')
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const expressValidator = require('express-validator');
const { readdirSync } = require("fs");
require('dotenv').config();
// App
const app = express();
// import router
// const authRoutes = require('./routes/auth')
// const userRoutes = require('./routes/user')
// const userGroupRoutes = require('./routes/usergroup')
// const categoryRoutes = require('./routes/category')
// const productRoutes = require('./routes/product')
// const brainTreeRoutes = require('./routes/braintree')
// const orderRoutes = require('./routes/order')
// const cloudinary = require('./routes/cloudinary')
// Db
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=>{console.log('DB conntect')})

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: "4mb" }));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//Roter middleware

// app.use("/api", authRoutes);
// app.use('/api', userRoutes);
// app.use('/api', userGroupRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', productRoutes);
// app.use('/api', brainTreeRoutes);
// app.use('/api', orderRoutes);


// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "You must be logged in"})
  }
});
//
const port = process.env.PORT || 8000

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client_nextjs/build'))
  const path = require('path')
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client_nextjs'))
  })
}
//Run
app.listen(port, () =>{
    console.log('Server is start on Port: ' + port)
})
