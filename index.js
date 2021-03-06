import express from "express"
import route from './src/routes/index.js'
import db from "./src/models/index.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route(app);

db.sequelize.sync()

const port = process.env.PORT || 5000;
console.log(process.env.DATABASE_URL)
app.listen(port, () => {
  console.log('App is now running at port ', port)
})

