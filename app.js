const express = require("express")
const mongoose = require('mongoose')
const socket = require("socket.io")
const cors = require('cors')
const dotenv = require("dotenv")
const pageRoute = require("./routes/pageRoute")
const offerRoute = require("./routes/offerRoute")
const productRoute = require("./routes/productRoute")



const app = express();
dotenv.config();


// -- --------CONNECT DB------------
mongoose.connect('mongodb+srv://muratcayir:nhhEsuCn4n8LqrOl@cluster0.8uwcr.mongodb.net/caseStudty?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => {
  console.log('DB Connected Successfully');
});

app.use(cors({credentials: true, origin: true}));
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -- TEMPLATE ENGINE --
app.set("view engine", "ejs");

// -- ROUTES --
app.use("/",pageRoute)
app.use('/products', productRoute);
app.use('/offers', offerRoute);



const server = process.env.PORT || app.listen(3000);;


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







