const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();

const userRoutes=require("./routes/userRoutes");
const postRoutes=require("./routes/postRouter")
const slideRoutes=require("./routes/slideRouter")
const userPostRoutes=require("./routes/userPostRouter")

const app=express();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace this with the origin of your client application
  credentials: true // Allow cookies or HTTP authentication to be included in the request
};

app.use(cors(
  corsOptions
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/user",userRoutes);
app.use("/api/story",postRoutes);
app.use("/api/slide",userPostRoutes);
app.use("/api/slide",slideRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:"SwipTory"
      })
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((err) => {
        console.log(err);
      });
  });