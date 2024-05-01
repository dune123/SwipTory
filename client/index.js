const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();

const userRoutes=require("./routes/userRoutes");

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/user",userRoutes);

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