import express from "express";
import cors from "cors";
import productRouter from "../routes/router";

const expressApp = express();

expressApp.use(express.json());
expressApp.use(cors());

expressApp.use("/api/product", productRouter);

export default expressApp;
