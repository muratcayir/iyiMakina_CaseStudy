const express = require("express")
const mongoose = require('mongoose')
const socket = require("socket.io")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const cors = require('cors')
const morgan = require("morgan")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const pageRoute = require("./routes/pageRoute")
const offerRoute = require("./routes/offerRoute")
const productRoute = require("./routes/productRoute")



const app = express();


// -- --------CONNECT DB------------
mongoose.connect('mongodb://localhost/caseStudy-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  console.log('DB Connected Successfully');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -- TEMPLATE ENGINE --
app.set("view engine", "ejs");

// -- ROUTES --
app.use("/",pageRoute)
app.use('/products', productRoute);
app.use('/offers', offerRoute);




const server = app.listen(3000);

const io = socket(server)

io.on('connection',(socket)=>{

  socket.on('chat',data =>{
    
    io.sockets.emit('chat',data) 
 })

  socket.on('joinRoom',productId =>{
     socket.join(productId)
     
  })

   socket.on("offerRoom",offer=>{
   io.to(offer.product).emit('offer',offer)
   })
  socket.on('typing',data =>
  {
      socket.broadcast.emit('typing',data)
  })

})

//-----------------SWAGGER-----------------------------


app.use(cors({credentials: true, origin: true}));

dotenv.config();
app.use(morgan("dev"));
app.use(cors());


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Library API",
      version: "3.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
const specs = swaggerJsDoc(options);