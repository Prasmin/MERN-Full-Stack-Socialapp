import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import Path from "path";
import { fileURLToPath } from "url";

/******* CONFIGURATION  *******/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.__dirname(__filename);
dotenv.config();
const app = express();

/****** MIDDLEWARE ******* **/
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodParser.json({ limit: "30mb", extended: true }));
app.use(bodParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assests", express.static(path.join(__dirname, "public/assets")));

/****** FILE STORAGE *******/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, full.originalname);
  },
});
const upload = multer({ storage });

/******* MONGOOSE SETUP *********/

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("server PORT: ${PORT}"));
  })
  .catch((error) => console.log("${error} did not connect"));
