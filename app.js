const express = require ('express');
const next = require('next');
const path = require('path');
const url = require('url');
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
    res.sendFile(path.resolve(__dirname, 'client_nextjs', 'build'))
  })
  
//   const nextApp = next({ dir: '.', dev });
//   const nextHandler = nextApp.getRequestHandler();

//   nextApp.prepare()
//   .then(() => {
//     const server = express();

//     if (!dev) {
//       // Enforce SSL & HSTS in production
//       server.use(function(req, res, next) {
//         var proto = req.headers["x-forwarded-proto"];
//         if (proto === "https") {
//           res.set({
//             'Strict-Transport-Security': 'max-age=31557600' // one-year
//           });
//           return next();
//         }
//         res.redirect("https://" + req.headers.host + req.url);
//       });
//     }

//     // Static files
//     // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
//     server.use('/static', express.static(path.join(__dirname, 'static'), {
//       maxAge: dev ? '0' : '365d'
//     }));

//     // Example server-side routing
//     server.get('/a', (req, res) => {
//       return nextApp.render(req, res, '/b', req.query)
//     })

//     // Example server-side routing
//     server.get('/b', (req, res) => {
//       return nextApp.render(req, res, '/a', req.query)
//     })

//     // Default catch-all renders Next app
//     server.get('*', (req, res) => {
//       // res.set({
//       //   'Cache-Control': 'public, max-age=3600'
//       // });
//       const parsedUrl = url.parse(req.url, true);
//       nextHandler(req, res, parsedUrl);
//     });

//     server.listen(port, (err) => {
//       if (err) throw err;
//       console.log(`Listening on http://localhost:${port}`);
//     });
//   });
}

//Run
app.listen(port, () =>{
    console.log('Server is start on Port: ' + port)
})
